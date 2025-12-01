"""
Simple backend starter without auth dependencies that cause errors.
This creates a minimal FastAPI server with just the chat endpoint.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Chatbot Backend",
    description="RAG Chatbot for Physical AI Book",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "Chatbot Backend is running!",
        "status": "ok",
        "endpoints": ["/api/query"]
    }

# Include chat router
from app.api import chat
app.include_router(chat.router, prefix="/api", tags=["chat"])

if __name__ == "__main__":
    import uvicorn
    print("=" * 60)
    print("Starting Chatbot Backend Server")
    print("=" * 60)
    print("Server will run on: http://localhost:8000")
    print("Chat endpoint: http://localhost:8000/api/query")
    print("=" * 60)
    uvicorn.run(app, host="0.0.0.0", port=8000)
