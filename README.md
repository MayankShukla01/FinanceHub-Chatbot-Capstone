# 🚀 FinanceHub — AI-Powered Indian Finance Chatbot

FinanceHub is a RAG (Retrieval-Augmented Generation) based chatbot website that helps beginners learn about the Indian stock market. Ask questions about SIP, mutual funds, stocks, IPOs, taxation, and more!

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS v4 |
| Icons | Lucide React |
| HTTP | Axios |
| Backend | FastAPI (Python) |
| LLM | Google Gemini 2.0 Flash |
| Embeddings | Sentence Transformers (all-MiniLM-L6-v2) |
| Vector DB | FAISS |
| Doc Processing | LangChain |

## 📦 Setup

### Prerequisites
- Node.js 18+
- Python 3.10+
- Gemini API Key ([Get one free](https://aistudio.google.com/apikey))

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate    # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
copy .env.example .env
# Edit .env and add your GEMINI_API_KEY

# Run the server
uvicorn app.main:app --reload
```

The backend will start at `http://localhost:8000`. On first run, it will:
1. Load the sentence transformer model (~90MB download)
2. Process knowledge documents into chunks
3. Build the FAISS vector index

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```

The frontend will start at `http://localhost:5173` with hot module replacement.

## 🎯 Features

- **AI Chat**: Ask any finance question and get contextual answers
- **45+ Topics**: Curated knowledge about Indian finance
- **Topic Explorer**: Browse by category — Stocks, MFs, SIP, IPO, etc.
- **Dark/Light Mode**: Toggle between themes
- **Responsive**: Works on desktop and mobile
- **RAG Pipeline**: FAISS + Sentence Transformers + Gemini API

## ⚠️ Disclaimer

FinanceHub is for educational purposes only. This is not financial advice. Always consult a SEBI-registered financial advisor before making investment decisions.
