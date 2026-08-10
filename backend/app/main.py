"""FastAPI application entry point for FinanceHub backend."""

import sys
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.rag_engine import rag_engine
from app.routes.chat import router as chat_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler — initializes RAG engine on startup."""
    # Startup: Initialize the RAG engine
    print("\n[*] Starting FinanceHub Backend...")
    rag_engine.initialize()
    print("[OK] FinanceHub Backend is ready!\n")
    yield
    # Shutdown: Cleanup if needed
    print("\n[*] Shutting down FinanceHub Backend...")


app = FastAPI(
    title="FinanceHub API",
    description="RAG-based finance chatbot API for Indian stock market beginners",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include chat routes under /api prefix
app.include_router(chat_router, prefix="/api")


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "name": "FinanceHub API",
        "version": "1.0.0",
        "description": "RAG-based finance chatbot for Indian stock market beginners",
        "docs": "/docs",
        "health": "/api/health",
    }
