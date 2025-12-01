"""
Simple test script to verify the chatbot API works
This bypasses the auth module to test just the chat functionality
"""
import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv('../.env')

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Chatbot Test Server")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import only the chat router (skip auth to avoid passlib issue)
from app.api import chat

app.include_router(chat.router, prefix="/api", tags=["chat"])

@app.get("/")
def read_root():
    return {
        "message": "Chatbot Test Server is running!",
        "note": "This is a simplified server for testing chatbot functionality only"
    }

if __name__ == "__main__":
    import uvicorn
    print("=" * 60)
    print("Starting Chatbot Test Server on http://localhost:8000")
    print("Test endpoint: POST http://localhost:8000/api/query")
    print("=" * 60)
    uvicorn.run(app, host="0.0.0.0", port=8000)
