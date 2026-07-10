"""Core RAG engine orchestrating retrieval and generation."""

import sys
import os

# Add parent directory to path so knowledge module can be imported
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.embeddings import embedding_model
from app.vector_store import vector_store
from app.llm import llm_client
from app.config import settings


class RAGEngine:
    """Orchestrates the full RAG pipeline: embed -> retrieve -> generate."""

    def __init__(self):
        self.initialized = False

    def initialize(self):
        """Initialize all RAG components: load/build index and set up LLM."""
        print("=" * 60)
        print("Initializing FinanceHub RAG Engine...")
        print("=" * 60)

        # Initialize LLM client
        llm_client.initialize()

        # Load embedding model
        embedding_model.load()

        # Try to load existing FAISS index
        if vector_store.load_index():
            print("Loaded existing FAISS index from cache.")
        else:
            print("No cached index found. Building from knowledge documents...")
            self._build_index()

        self.initialized = True
        print("=" * 60)
        print("FinanceHub RAG Engine initialized successfully!")
        print("=" * 60)

    def _build_index(self):
        """Build the FAISS index from knowledge base documents."""
        from knowledge.loader import load_and_split

        # Load and split documents
        chunks, metadatas = load_and_split()

        # Generate embeddings for all chunks
        print("Generating embeddings for document chunks...")
        embeddings = embedding_model.embed_texts(chunks)

        # Build FAISS index
        vector_store.build_index(chunks, embeddings, metadatas)

        # Save index to disk for future use
        vector_store.save_index()

    async def query(self, message: str, history: list[dict] = None) -> dict:
        """Process a user query through the RAG pipeline.

        Args:
            message: The user's question.
            history: Previous conversation messages [{role, content}].

        Returns:
            Dict with 'answer' (str) and 'sources' (list[str]).
        """
        if not self.initialized:
            return {
                "answer": "The system is still initializing. Please try again in a moment.",
                "sources": [],
            }

        # Step 1: Embed the user query
        query_vector = embedding_model.embed_query(message)

        # Step 2: Retrieve relevant chunks from FAISS
        results = vector_store.search(query_vector, top_k=settings.TOP_K)

        # Step 3: Generate response using Gemini with retrieved context
        answer = await llm_client.generate_response(
            query=message,
            context_chunks=results,
            chat_history=history,
        )

        # Step 4: Extract unique source filenames
        sources = list(set(
            r["metadata"].get("source", "Unknown")
            for r in results
            if r.get("metadata")
        ))

        return {
            "answer": answer,
            "sources": sources,
        }


# Global singleton instance
rag_engine = RAGEngine()
