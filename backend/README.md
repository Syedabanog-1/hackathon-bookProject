# Backend Setup Guide

## Overview

This backend provides:
- **Authentication API** (`/api/auth/*`) - User registration and login
- **RAG Chatbot API** (`/api/query`) - AI-powered question answering using Qdrant vector database
- **ChatKit Session API** (`/api/chatkit/session`) - Session management for chat interface

## Prerequisites

- Python 3.8+
- OpenAI API key
- Qdrant Cloud account (or local Qdrant instance)
- PostgreSQL database (Neon or local)

## Installation

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Ensure your `.env` file in the project root contains:

```env
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key

# Qdrant Vector Database
QDRANT_URL=https://your-qdrant-instance.cloud.qdrant.io
QDRANT_API_KEY=your_qdrant_api_key
QDRANT_COLLECTION_NAME=physical_ai_book

# Model Configuration
MODEL_NAME=gpt-4o-mini

# Neon Serverless Postgres
NEON_DB_URL=your_neon_database_url
```

## Data Ingestion

Before the chatbot can answer questions, you need to ingest the book content into Qdrant:

### Run the Ingestion Script

```bash
cd backend
python ingest.py
```

**Expected Output:**
```
============================================================
QDRANT INGESTION SCRIPT
============================================================
✓ OpenAI API Key: ********************kyyEA
✓ Qdrant URL: https://...
✓ Collection: physical_ai_book

✓ Created collection 'physical_ai_book'

Reading markdown files...
Found 17 markdown files
  ✓ Loaded: intro.md
  ✓ Loaded: index.md
  ...

Processing 17 documents...

📊 Total chunks: 156
Creating embeddings...
✓ Created 156 embeddings

📤 Upserting 156 points to Qdrant...
✅ SUCCESS! Upsert result: {'status': 'completed'}

============================================================
Chatbot is now ready to answer questions!
============================================================
```

## Running the Backend

### Start the FastAPI Server

```bash
cd backend
python main.py
```

The server will start on `http://localhost:8000`

### Verify the Server

Visit `http://localhost:8000` in your browser. You should see:

```json
{
  "message": "FastAPI backend is running!",
  "features": ["Authentication", "User Management", "AI Chatbot via /api/query"]
}
```

## Testing the Chatbot API

### Using curl

```bash
curl -X POST http://localhost:8000/api/query \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"What is Physical AI?\"}"
```

### Using Python

```python
import requests

response = requests.post(
    "http://localhost:8000/api/query",
    json={"query": "What is Physical AI?"}
)

print(response.json())
```

## API Endpoints

### Chat Endpoints

#### POST `/api/query`

Query the RAG chatbot.

**Request Body:**
```json
{
  "query": "What is Physical AI?",
  "selected_text": null,  // Optional: context from selected text
  "top_k": 4              // Optional: number of relevant chunks to retrieve
}
```

**Response:**
```json
{
  "choices": [
    {
      "message": {
        "content": "Physical AI represents a paradigm shift..."
      }
    }
  ]
}
```

#### POST `/api/chatkit/session`

Create a chat session (returns session token).

### Auth Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

## Troubleshooting

### Issue: "No markdown files found"

**Solution:** The ingestion script looks for markdown files in `../docs`. Ensure you're running it from the `backend` directory.

### Issue: "OPENAI_API_KEY not set"

**Solution:** Ensure your `.env` file is in the project root (not in the backend folder) and contains a valid OpenAI API key.

### Issue: "Connection refused" when calling API

**Solution:** Make sure the backend server is running on port 8000. Check for port conflicts.

### Issue: Chatbot returns empty or irrelevant answers

**Solution:** Re-run the ingestion script to ensure all content is properly embedded in Qdrant.

## Development

### Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── auth.py      # Authentication endpoints
│   │   └── chat.py      # Chatbot endpoints
│   ├── database/
│   │   └── db.py        # Database configuration
│   ├── models/
│   │   └── user.py      # User models
│   └── main.py          # FastAPI app configuration
├── ingest.py            # Data ingestion script
├── main.py              # Entry point
└── requirements.txt     # Python dependencies
```

### Adding New Content

To add new content to the chatbot's knowledge base:

1. Add markdown files to the `docs/` directory
2. Run `python ingest.py` to re-ingest the content
3. The chatbot will now be able to answer questions about the new content

## Production Deployment

For production deployment:

1. Set `DEBUG=False` in your environment
2. Use a production WSGI server like Gunicorn:
   ```bash
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```
3. Set up proper CORS origins in `app/main.py`
4. Use environment-specific `.env` files
5. Enable HTTPS/SSL
