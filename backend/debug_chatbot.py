"""
Debug script to test the chatbot API and see detailed error messages
"""
import os
import sys
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv('../.env')

# Test environment variables
print("=" * 60)
print("ENVIRONMENT CHECK")
print("=" * 60)
print(f"OPENAI_API_KEY: {'SET' if os.getenv('OPENAI_API_KEY') else 'NOT SET'}")
print(f"QDRANT_URL: {os.getenv('QDRANT_URL')}")
print(f"QDRANT_API_KEY: {'SET' if os.getenv('QDRANT_API_KEY') else 'NOT SET'}")
print(f"QDRANT_COLLECTION_NAME: {os.getenv('QDRANT_COLLECTION_NAME', 'calcu_book')}")
print()

# Test the query logic directly
print("=" * 60)
print("TESTING QUERY LOGIC")
print("=" * 60)

try:
    import requests
    from openai import OpenAI
    
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    QDRANT_URL = os.getenv('QDRANT_URL')
    QDRANT_API_KEY = os.getenv('QDRANT_API_KEY')
    COLLECTION = os.getenv('QDRANT_COLLECTION_NAME', 'physical_ai_book')
    
    query = "What is Physical AI?"
    
    # Step 1: Create embedding
    print(f"1. Creating embedding for query: '{query}'")
    client = OpenAI(api_key=OPENAI_API_KEY)
    emb_resp = client.embeddings.create(model="text-embedding-3-small", input=query)
    query_vector = emb_resp.data[0].embedding
    print(f"   ✓ Embedding created (dimension: {len(query_vector)})")
    
    # Step 2: Query Qdrant
    print(f"\n2. Querying Qdrant collection '{COLLECTION}'")
    qdrant_search_url = QDRANT_URL.rstrip('/') + f"/collections/{COLLECTION}/points/search"
    headers = {"api-key": QDRANT_API_KEY, "Content-Type": "application/json"} if QDRANT_API_KEY else {"Content-Type": "application/json"}
    payload = {"vector": query_vector, "limit": 4}
    
    r = requests.post(qdrant_search_url, headers=headers, json=payload)
    print(f"   Status: {r.status_code}")
    
    if r.status_code != 200:
        print(f"   ✗ Error: {r.text}")
        sys.exit(1)
    
    result = r.json()
    hits = result.get("result", [])
    print(f"   ✓ Found {len(hits)} results")
    
    # Step 3: Extract context
    print(f"\n3. Extracting context from results")
    contexts = []
    for i, h in enumerate(hits[:4]):
        payload_data = h.get('payload', {})
        txt = payload_data.get('text', '')
        if txt:
            contexts.append(txt)
            print(f"   ✓ Result {i+1}: {len(txt)} characters")
    
    context_text = "\n\n".join(contexts)
    print(f"   Total context: {len(context_text)} characters")
    
    # Step 4: Call OpenAI
    print(f"\n4. Calling OpenAI API")
    prompt = f"Use the following context to answer the question:\n\n{context_text}\n\nQuestion: {query}\nAnswer:"
    headers = {"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"}
    payload = {"model": "gpt-4o-mini", "messages": [{"role":"user","content": prompt}]}
    
    resp = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    print(f"   Status: {resp.status_code}")
    
    if resp.status_code != 200:
        print(f"   ✗ Error: {resp.text}")
        sys.exit(1)
    
    response_data = resp.json()
    answer = response_data['choices'][0]['message']['content']
    
    print(f"\n{'=' * 60}")
    print("SUCCESS! CHATBOT RESPONSE:")
    print(f"{'=' * 60}")
    print(answer)
    print(f"{'=' * 60}")
    
except Exception as e:
    print(f"\n✗ ERROR: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
