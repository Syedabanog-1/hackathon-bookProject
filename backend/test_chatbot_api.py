"""
Test script to verify chatbot API functionality without starting the full server.
This tests the RAG query endpoint directly.
"""
import os
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from dotenv import load_dotenv
load_dotenv()

# Test imports
try:
    from app.api.chat import query_endpoint, QueryRequest
    print("✓ Successfully imported chat API")
except Exception as e:
    print(f"✗ Error importing chat API: {e}")
    sys.exit(1)

# Test configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION_NAME", "physical_ai_book")

print("\n" + "="*60)
print("CHATBOT API TEST")
print("="*60)
print(f"✓ OpenAI API Key: {'*' * 20}{OPENAI_API_KEY[-4:] if OPENAI_API_KEY else 'NOT SET'}")
print(f"✓ Qdrant URL: {QDRANT_URL}")
print(f"✓ Collection: {QDRANT_COLLECTION}")
print()

# Test queries
test_queries = [
    "What is Physical AI?",
    "Explain embodied intelligence",
    "What sensors are used in robotics?"
]

async def run_tests():
    """Run test queries against the chatbot API"""
    for i, query_text in enumerate(test_queries, 1):
        print(f"\n{'='*60}")
        print(f"Test {i}: {query_text}")
        print('='*60)
        
        try:
            request = QueryRequest(query=query_text, top_k=3)
            result = await query_endpoint(request)
            
            # Extract answer from OpenAI response
            answer = result.get('choices', [{}])[0].get('message', {}).get('content', 'No answer')
            print(f"\n✓ Answer:\n{answer}\n")
            
        except Exception as e:
            print(f"\n✗ Error: {e}\n")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    import asyncio
    print("\nRunning chatbot tests...\n")
    asyncio.run(run_tests())
    print("\n" + "="*60)
    print("TESTS COMPLETE")
    print("="*60)
