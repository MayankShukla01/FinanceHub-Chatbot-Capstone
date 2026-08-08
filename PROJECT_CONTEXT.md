# 🚀 FinanceHub — Complete Project Context & Documentation

> **Project**: FinanceHub — AI-Powered Indian Finance Chatbot  
> **Author**: MayankShukla01  
> **Repository**: [github.com/MayankShukla01/FinanceHub-Chatbot-Capstone](https://github.com/MayankShukla01/FinanceHub-Chatbot-Capstone)  
> **Last Updated**: July 30, 2026

---

## 📋 Project Overview

FinanceHub is a full-stack **RAG (Retrieval-Augmented Generation)** based chatbot website that helps beginners learn about the **Indian stock market**. Users can ask questions about SIP, mutual funds, stocks, IPOs, taxation, and more — and get clear, beginner-friendly answers backed by a curated knowledge base and powered by Google's Gemini AI.

### Key Features
- **AI Chat** — Ask any finance question, get contextual answers with source citations
- **RAG Pipeline** — FAISS vector search + Sentence Transformers + Gemini API
- **Live Market Data** — Real-time Nifty 50, Sensex, and top Indian stock charts via Yahoo Finance
- **Dark/Light Mode** — Toggle between themes with persistent preference
- **Interactive UI** — Mouse-tracking cursor glow, 3D tilt cards, parallax floating orbs
- **Indian Focus** — BSE, NSE, SEBI, Indian brokers, Indian tax laws (STCG, LTCG)

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────┐
│                    FRONTEND                          │
│  React 18 + Vite + Tailwind CSS v4 + Recharts       │
│                                                      │
│  User ──► ChatInput ──► Axios ──► /api/chat          │
│                                    /api/market-data   │
└────────────────────────┬─────────────────────────────┘
                         │ HTTP (Vite proxy → :8000)
┌────────────────────────▼─────────────────────────────┐
│                    BACKEND                           │
│  FastAPI + Uvicorn                                   │
│                                                      │
│  /api/chat ──► RAG Engine:                           │
│     1. Embed query (Sentence Transformers)           │
│     2. Search FAISS index (cosine similarity)        │
│     3. Retrieve top-5 chunks from knowledge base     │
│     4. Send query + context to Gemini 2.0 Flash      │
│     5. Return answer + source filenames              │
│                                                      │
│  /api/market-data ──► yfinance:                      │
│     Fetch Nifty 50, Sensex, 6 stocks (5-min cache)  │
│                                                      │
│  /api/topics ──► Static topic list                   │
│  /api/health ──► Health check                        │
└──────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 18.x |
| **Build Tool** | Vite | 8.1.3 |
| **Styling** | Tailwind CSS | v4 (CSS-first config) |
| **Charts** | Recharts | latest |
| **Icons** | Lucide React | latest |
| **HTTP Client** | Axios | latest |
| **Backend** | FastAPI | 0.115.12 |
| **ASGI Server** | Uvicorn | 0.34.3 |
| **LLM** | Google Gemini 2.0 Flash | via google-generativeai 0.8.6 |
| **Embeddings** | Sentence Transformers | 4.1.0 (all-MiniLM-L6-v2) |
| **Vector DB** | FAISS (CPU) | 1.11.0 |
| **Doc Processing** | LangChain | 0.3.25 |
| **Market Data** | yfinance | 0.2.55 |
| **Config** | Pydantic Settings | 2.9.1 |

---

## 📁 Complete File Structure

```
RAG/
├── .gitignore
├── README.md
├── render.yaml                         # Render deployment config
│
├── backend/
│   ├── .env                            # Real API key (git-ignored)
│   ├── .env.example                    # Placeholder for setup
│   ├── requirements.txt                # Python dependencies
│   ├── build.sh                        # Render build script
│   │
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py                   # Pydantic settings from .env
│   │   ├── embeddings.py               # Sentence Transformer wrapper (singleton)
│   │   ├── vector_store.py             # FAISS index: build, search, save, load
│   │   ├── llm.py                      # Gemini API client with system prompt
│   │   ├── rag_engine.py               # RAG orchestrator (embed→retrieve→generate)
│   │   ├── main.py                     # FastAPI app with CORS + lifespan
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── chat.py                 # /api/chat, /api/topics, /api/health
│   │       └── market.py               # /api/market-data (yfinance)
│   │
│   └── knowledge/
│       ├── loader.py                   # LangChain doc loader + text splitter
│       └── documents/                  # 10 curated Indian finance docs
│           ├── market_basics.txt       # BSE, NSE, Sensex, Nifty basics
│           ├── getting_started.txt     # Opening Demat, choosing broker
│           ├── mutual_funds.txt        # Types, NAV, AMC, fund selection
│           ├── sip.txt                 # SIP mechanics, rupee cost averaging
│           ├── bonds_savings.txt       # PPF, FD, govt bonds, sovereign gold
│           ├── ipo.txt                 # IPO process, ASBA, allotment
│           ├── trading.txt             # Intraday, delivery, F&O basics
│           ├── portfolio.txt           # Diversification, asset allocation
│           ├── taxation.txt            # STCG, LTCG, TDS, ITR filing
│           └── glossary.txt            # 60+ financial terms defined
│
└── frontend/
    ├── index.html                      # Entry HTML with SEO meta
    ├── package.json                    # npm dependencies
    ├── vite.config.js                  # Tailwind v4 plugin + /api proxy
    │
    └── src/
        ├── main.jsx                    # React entry point
        ├── App.jsx                     # Root layout: Navbar→Hero→Chat→Market→Footer
        ├── index.css                   # Tailwind v4 CSS-first config + design tokens
        │
        ├── context/
        │   └── ThemeContext.jsx         # Dark/light mode provider + localStorage
        │
        ├── services/
        │   └── api.js                  # Axios: sendMessage, getTopics, getMarketData
        │
        ├── data/
        │   └── topics.js              # 10 categories × 5 topics (50 total)
        │
        └── components/
            ├── layout/
            │   ├── Navbar.jsx          # Fixed nav with logo + theme toggle
            │   ├── ThemeToggle.jsx     # Animated sun/moon button
            │   └── Footer.jsx          # Minimal footer with disclaimer
            │
            ├── home/
            │   ├── HeroSection.jsx     # Mouse-reactive parallax hero
            │   ├── FeaturesSection.jsx # (exists but removed from layout)
            │   └── HowItWorks.jsx      # (exists but removed from layout)
            │
            ├── effects/
            │   ├── CursorGlow.jsx      # Mouse-tracking radial glow (dark mode)
            │   └── TiltCard.jsx        # 3D parallax tilt on hover
            │
            ├── chat/
            │   ├── ChatSection.jsx     # Full chat UI with integrated topic pills
            │   ├── ChatInput.jsx       # Auto-resize input with glowing focus
            │   ├── MessageBubble.jsx   # Styled bubbles with markdown rendering
            │   ├── SuggestedQuestions.jsx  # Clickable question chips
            │   └── TypingIndicator.jsx # Animated bouncing dots
            │
            ├── topics/
            │   └── TopicExplorer.jsx   # (exists but removed from layout)
            │
            └── market/
                └── MarketDataSection.jsx  # Live charts: Nifty, Sensex, 6 stocks
```

---

## 🔧 Component Details

### Backend Components

#### `config.py` — Environment Settings
- Uses Pydantic `BaseSettings` to load `GEMINI_API_KEY` from `.env`
- Fields: `gemini_api_key`, `embedding_model_name` (default: `all-MiniLM-L6-v2`), `chunk_size` (500), `chunk_overlap` (50)

#### `embeddings.py` — Sentence Transformer Wrapper
- Singleton pattern — loads model once on first use
- Uses `all-MiniLM-L6-v2` (384-dim embeddings, ~90MB)
- Normalizes embeddings for cosine similarity

#### `vector_store.py` — FAISS Vector Store
- Uses `IndexFlatIP` (inner product = cosine similarity on normalized vectors)
- Methods: `build_index(texts, metadatas)`, `search(query_embedding, top_k=5)`, `save()`, `load()`
- Saves/loads index + metadata to `backend/faiss_index/` directory for caching

#### `llm.py` — Gemini API Client
- Creates a new `GenerativeModel` per request with dynamic `system_instruction` (context-enriched)
- System prompt instructs AI to focus on Indian finance, be beginner-friendly, cite sources
- Temperature: 0.7, max_output_tokens: 2048
- **Fix applied**: `system_instruction` moved from `generate_content()` to `GenerativeModel()` constructor

#### `rag_engine.py` — RAG Orchestrator
- `initialize()`: Loads documents → chunks → builds FAISS index (or loads cached)
- `query(question, history)`: Embeds question → FAISS top-5 → Gemini generate → return answer + sources

#### `routes/chat.py` — Chat API
- `POST /api/chat`: Accepts `{message, history}`, returns `{answer, sources}`
- `GET /api/topics`: Returns topic categories from knowledge base
- `GET /api/health`: Health check endpoint

#### `routes/market.py` — Market Data API
- `GET /api/market-data`: Returns live stock data via yfinance
- **Indices**: NIFTY 50 (`^NSEI`), SENSEX (`^BSESN`)
- **Stocks**: Reliance, TCS, HDFC Bank, Infosys, Bharti Airtel, ITC
- **Cache**: 5-minute TTL to avoid rate limiting
- Returns 1-month daily price history for each symbol

#### `knowledge/loader.py` — Document Processor
- Uses LangChain `TextLoader` + `RecursiveCharacterTextSplitter`
- Chunk size: 500 chars, overlap: 50 chars
- Processes all `.txt` files from `knowledge/documents/`

### Frontend Components

#### `index.css` — Design System (Tailwind v4)
- **Dark palette**: `#07090f` (base), `#0d1117` (surface), `#151b28` (card), `#131a27` (input)
- **Accents**: Mint `#00e8b8`, Blue `#5b8def`, Violet `#8b5cf6`
- **Fonts**: Space Grotesk (headings), Inter (body)
- **Animations**: fade-in, slide-up, float, bounce-dot, shimmer, orbit

#### `App.jsx` — Root Layout
- Simplified layout: `Navbar → HeroSection → ChatSection → MarketDataSection → Footer`
- Removed FeaturesSection, HowItWorks, TopicExplorer from main layout (decluttered)
- Topic quick-access pills integrated directly into ChatSection

#### `CursorGlow.jsx` — Mouse Glow Effect
- Renders a 500px radial gradient that follows the cursor
- Only active in dark mode
- Colors: mint + blue radial gradient with low opacity

#### `TiltCard.jsx` — 3D Tilt Effect
- Wraps any content with mouse-reactive 3D perspective transform
- ±8° rotation on X/Y axes, subtle 1.02x scale on hover

#### `HeroSection.jsx` — Interactive Hero
- Mouse-tracking gradient blobs (3 large blurred circles)
- 4 floating dot particles that move with mouse parallax
- Compact: tagline + description + scroll CTA

#### `ChatSection.jsx` — Chat Interface
- 8 quick-topic buttons shown at start (replaces the sprawling TopicExplorer)
- Full message history with auto-scroll
- API integration with error handling (network/server errors)
- Wrapped in TiltCard for 3D effect

#### `MarketDataSection.jsx` — Live Market Charts
- 6 stock price cards (Reliance, TCS, HDFC, Infosys, Airtel, ITC) in a grid
- 2 area charts (Nifty 50, Sensex) with Recharts
- Custom tooltips showing ₹ price with Indian locale formatting
- Green/red coloring based on price direction
- Manual refresh button with loading animation
- TiltCard wrapper on charts

---

## 📡 API Endpoints

| Method | Endpoint | Request Body | Response |
|--------|----------|-------------|----------|
| POST | `/api/chat` | `{message: string, history: [{role, content}]}` | `{answer: string, sources: string[]}` |
| GET | `/api/topics` | — | `{topics: [{category, items}]}` |
| GET | `/api/health` | — | `{status: "healthy"}` |
| GET | `/api/market-data` | — | `{indices: [...], stocks: [...], lastUpdated: string}` |

---

## 📝 Steps Taken (Chronological)

### Phase 1: Planning & Setup
1. User requested a RAG-based chatbot for Indian stock market beginners
2. Created implementation plan with tech stack decisions
3. User specified: Gemini API, GitHub deployment, Indian focus, "FinanceHub" name, dark/light mode, desktop-first
4. User confirmed tech stack: React + Vite + Tailwind v4 + FastAPI + FAISS + Sentence Transformers

### Phase 2: Backend Development
5. Scaffolded backend directory structure
6. Created `requirements.txt` with all Python dependencies
7. Created 10 comprehensive Indian finance knowledge documents (~85KB total)
8. Built `config.py` (Pydantic settings)
9. Built `embeddings.py` (Sentence Transformer singleton wrapper)
10. Built `vector_store.py` (FAISS index with cosine similarity)
11. Built `llm.py` (Gemini API client with Indian finance system prompt)
12. Built `knowledge/loader.py` (LangChain document processing)
13. Built `rag_engine.py` (RAG orchestrator)
14. Built `routes/chat.py` (API endpoints)
15. Built `main.py` (FastAPI app with CORS + lifespan)

### Phase 3: Frontend Development (Initial)
16. Scaffolded React + Vite project with Tailwind v4
17. Created `index.css` with design tokens and animations
18. Built ThemeContext (dark/light with localStorage)
19. Built Axios API service
20. Built topic data (10 categories × 5 topics)
21. Built components: Navbar, ThemeToggle, Footer, HeroSection, FeaturesSection, HowItWorks, TopicExplorer
22. Built chat components: ChatInput, MessageBubble, TypingIndicator, SuggestedQuestions
23. Built ChatSection and App.jsx

### Phase 4: Bug Fixes
24. Fixed Lucide React icon import (`Github` → `ExternalLink`)
25. Fixed Gemini API error: moved `system_instruction` from `generate_content()` to `GenerativeModel()` constructor
26. Verified frontend build and backend API responses

### Phase 5: GitHub Deployment
27. Initialized Git repo, created `.gitignore`
28. Fixed GitHub push protection (removed real API key from `.env.example`)
29. Pushed to `MayankShukla01/FinanceHub-Chatbot-Capstone`

### Phase 6: UI Redesign (Decluttering + Interactivity)
30. Rewrote `index.css` with richer dark palette (#07090f base, #151b28 cards, #131a27 inputs)
31. Created `CursorGlow.jsx` (mouse-tracking radial glow)
32. Created `TiltCard.jsx` (3D parallax on hover)
33. Redesigned HeroSection with parallax floating orbs
34. Simplified App.jsx: removed FeaturesSection, HowItWorks, TopicExplorer
35. Integrated 8 quick-topic buttons directly inside ChatSection
36. Redesigned all chat components with new dark palette
37. Redesigned Footer (minimal single line)

### Phase 7: Live Market Data
38. Added `yfinance` to requirements
39. Created `routes/market.py` (Yahoo Finance API with 5-min cache)
40. Registered market router in `main.py`
41. Added `getMarketData()` to frontend API service
42. Installed `recharts` for charting
43. Created `MarketDataSection.jsx` with area charts + price cards
44. Added MarketDataSection to App.jsx between Chat and Footer

### Phase 8: Deployment Config
45. Created `render.yaml` for Render backend deployment
46. Created `build.sh` for Render build step
47. Installed all missing Python dependencies globally

---

## 🚀 How to Run

### Backend
```bash
cd backend
# If using virtual environment:
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate  # macOS/Linux

pip install -r requirements.txt

# Create .env with your Gemini API key
copy .env.example .env
# Edit .env → GEMINI_API_KEY=your_key_here

python -m uvicorn app.main:app --reload
# Backend starts at http://localhost:8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend starts at http://localhost:5173
```

---

## ⚠️ Known Issues & Notes
- **First startup is slow**: Downloads sentence-transformers model (~90MB) and builds FAISS index
- **yfinance rate limits**: Data cached for 5 minutes; Yahoo may block rapid requests
- **Virtual environment**: Dependencies were installed globally; recommend using venv for isolation
- **Tailwind v4**: Uses CSS-first config in `index.css`, NOT `tailwind.config.js`
- **FeaturesSection, HowItWorks, TopicExplorer**: Files exist but are NOT rendered in the current layout (removed during UI decluttering)

---

## 🔮 Future Considerations (User Mentioned)
- Multi-language support (beyond English)
- User authentication (login/accounts)
- SQLite/PostgreSQL chat history persistence
- Cloud deployment (Render backend + Vercel frontend)

---

*This document serves as a complete context snapshot of the FinanceHub project as of July 30, 2026.*
