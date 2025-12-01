# ingest.py - chunk docs, get embeddings, and upsert to Qdrant
import os, glob, json, math
from pathlib import Path
from typing import List
from dotenv import load_dotenv

# Load environment variables from parent directory
load_dotenv('../.env')

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
QDRANT_URL = os.getenv('QDRANT_URL')
QDRANT_API_KEY = os.getenv('QDRANT_API_KEY')
COLLECTION = os.getenv('QDRANT_COLLECTION_NAME','physical_ai_book')

def read_markdown_files(docs_dir='../docs'):
    """Read all markdown files from the docs directory."""
    md_files = glob.glob(os.path.join(docs_dir, '**', '*.md'), recursive=True)
    if not md_files:
        print(f"WARNING: No markdown files found in {docs_dir}")
        return []
    print(f"Found {len(md_files)} markdown files")
    contents = []
    for p in md_files:
        try:
            with open(p, 'r', encoding='utf-8') as f:
                text = f.read()
                if text.strip():  # Only add non-empty files
                    contents.append({'path': p, 'text': text})
                    print(f"  ✓ Loaded: {Path(p).name}")
        except Exception as e:
            print(f"  ✗ Error reading {p}: {e}")
    return contents

def chunk_text(text, max_tokens=500):
    # naive splitter by paragraphs - adjust as needed
    paras = [p.strip() for p in text.split('\n\n') if p.strip()]
    chunks = []
    cur = ''
    for p in paras:
        if len(cur) + len(p) > 4000:
            chunks.append(cur)
            cur = p
        else:
            cur = (cur + '\n\n' + p).strip()
    if cur:
        chunks.append(cur)
    return chunks

def embed_texts(texts: List[str]):
    # use REST OpenAI embeddings
    import requests
    if not OPENAI_API_KEY:
        raise RuntimeError('OPENAI_API_KEY not set')
    url = 'https://api.openai.com/v1/embeddings'
    headers = {'Authorization': f'Bearer {OPENAI_API_KEY}', 'Content-Type': 'application/json'}
    payload = {'model':'text-embedding-3-small','input': texts}
    r = requests.post(url, headers=headers, json=payload)
    r.raise_for_status()
    data = r.json()
    return [d['embedding'] for d in data['data']]

def upsert_to_qdrant(points):
    import requests
    if not QDRANT_URL:
        raise RuntimeError('QDRANT_URL not set')
    url = QDRANT_URL.rstrip('/') + f"/collections/{COLLECTION}/points?wait=true"
    headers = {'Content-Type': 'application/json'}
    if QDRANT_API_KEY:
        headers['api-key'] = QDRANT_API_KEY
    payload = {'points': points}
    try:
        r = requests.put(url, headers=headers, json=payload)
        r.raise_for_status()
        return r.json()
    except Exception as e:
        print(f"Error upserting to Qdrant: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response: {e.response.text}")
        raise

def create_collection_if_not_exists():
    """Create Qdrant collection if it doesn't exist."""
    import requests
    if not QDRANT_URL:
        raise RuntimeError('QDRANT_URL not set')
    
    # Check if collection exists
    url = QDRANT_URL.rstrip('/') + f"/collections/{COLLECTION}"
    headers = {'Content-Type': 'application/json'}
    if QDRANT_API_KEY:
        headers['api-key'] = QDRANT_API_KEY
    
    try:
        r = requests.get(url, headers=headers)
        if r.status_code == 200:
            print(f"✓ Collection '{COLLECTION}' already exists")
            return
    except Exception as e:
        print(f"Collection check failed: {e}")
    
    # Create collection with text-embedding-3-small dimensions (1536)
    create_url = QDRANT_URL.rstrip('/') + f"/collections/{COLLECTION}"
    payload = {
        "vectors": {
            "size": 1536,
            "distance": "Cosine"
        }
    }
    try:
        r = requests.put(create_url, headers=headers, json=payload)
        r.raise_for_status()
        print(f"✓ Created collection '{COLLECTION}'")
    except Exception as e:
        print(f"Warning: Could not create collection: {e}")

def main():
    # Validate environment variables
    print("=" * 60)
    print("QDRANT INGESTION SCRIPT")
    print("=" * 60)
    
    if not OPENAI_API_KEY:
        raise RuntimeError('❌ OPENAI_API_KEY not set in environment')
    if not QDRANT_URL:
        raise RuntimeError('❌ QDRANT_URL not set in environment')
    
    print(f"✓ OpenAI API Key: {'*' * 20}{OPENAI_API_KEY[-4:]}")
    print(f"✓ Qdrant URL: {QDRANT_URL}")
    print(f"✓ Collection: {COLLECTION}")
    print()
    
    # Create collection if needed
    create_collection_if_not_exists()
    print()
    
    # Read and process documents
    print("Reading markdown files...")
    docs = read_markdown_files()
    if not docs:
        print("❌ No documents found to ingest!")
        return
    
    print(f"\nProcessing {len(docs)} documents...")
    all_chunks = []
    for doc in docs:
        chunks = chunk_text(doc['text'])
        for i,c in enumerate(chunks):
            chunk_id = f"{Path(doc['path']).stem}_{i}"
            all_chunks.append({
                'id': chunk_id, 
                'text': c, 
                'meta': {'path': doc['path'], 'source': Path(doc['path']).name}
            })
    
    texts = [c['text'] for c in all_chunks]
    print(f"\n📊 Total chunks: {len(texts)}")
    print(f"Creating embeddings...")
    
    embeddings = embed_texts(texts)
    print(f"✓ Created {len(embeddings)} embeddings")
    
    points = []
    for i,chunk in enumerate(all_chunks):
        points.append({
            'id': i,  # Use numeric ID for Qdrant
            'vector': embeddings[i], 
            'payload': {
                'text': chunk['text'], 
                'meta': chunk['meta'],
                'chunk_id': chunk['id']  # Store original chunk ID in payload
            }
        })
    
    print(f"\n📤 Upserting {len(points)} points to Qdrant...")
    res = upsert_to_qdrant(points)
    print(f"✅ SUCCESS! Upsert result: {res}")
    print(f"\n{'=' * 60}")
    print(f"Chatbot is now ready to answer questions!")
    print(f"{'=' * 60}")

if __name__ == '__main__':
    main()
