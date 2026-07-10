"""FAISS vector store for document chunk retrieval."""

import os
import pickle
import numpy as np
import faiss
from app.config import settings


class VectorStore:
    """Manages a FAISS index for similarity search over document chunks."""

    def __init__(self):
        self.index = None
        self.chunks: list[str] = []
        self.metadatas: list[dict] = []
        self.dimension: int = 0

    def build_index(self, chunks: list[str], embeddings: np.ndarray, metadatas: list[dict]):
        """Build a FAISS index from chunk embeddings.

        Args:
            chunks: List of text chunks.
            embeddings: numpy array of shape (n_chunks, embedding_dim), normalized.
            metadatas: List of metadata dicts for each chunk.
        """
        self.chunks = chunks
        self.metadatas = metadatas
        self.dimension = embeddings.shape[1]

        # Use IndexFlatIP (inner product) — with normalized vectors this gives cosine similarity
        self.index = faiss.IndexFlatIP(self.dimension)
        self.index.add(embeddings)
        print(f"FAISS index built with {self.index.ntotal} vectors (dim={self.dimension}).")

    def search(self, query_vector: np.ndarray, top_k: int = None) -> list[dict]:
        """Search the FAISS index for the most similar chunks.

        Args:
            query_vector: numpy array of shape (1, embedding_dim), normalized.
            top_k: Number of top results to return.

        Returns:
            List of dicts with 'text', 'metadata', and 'score' keys.
        """
        if self.index is None:
            raise RuntimeError("FAISS index not initialized. Call build_index() first.")

        if top_k is None:
            top_k = settings.TOP_K

        scores, indices = self.index.search(query_vector, top_k)

        results = []
        for i, idx in enumerate(indices[0]):
            if idx == -1:
                continue
            results.append({
                "text": self.chunks[idx],
                "metadata": self.metadatas[idx],
                "score": float(scores[0][i]),
            })

        return results

    def save_index(self, path: str = None):
        """Save the FAISS index and metadata to disk.

        Args:
            path: Directory path to save the index files.
        """
        if path is None:
            path = settings.FAISS_INDEX_PATH

        os.makedirs(path, exist_ok=True)

        # Save FAISS index
        faiss.write_index(self.index, os.path.join(path, "index.faiss"))

        # Save chunks and metadata
        with open(os.path.join(path, "metadata.pkl"), "wb") as f:
            pickle.dump({
                "chunks": self.chunks,
                "metadatas": self.metadatas,
                "dimension": self.dimension,
            }, f)

        print(f"FAISS index saved to {path}/")

    def load_index(self, path: str = None) -> bool:
        """Load a FAISS index and metadata from disk.

        Args:
            path: Directory path containing saved index files.

        Returns:
            True if loaded successfully, False if files don't exist.
        """
        if path is None:
            path = settings.FAISS_INDEX_PATH

        index_path = os.path.join(path, "index.faiss")
        meta_path = os.path.join(path, "metadata.pkl")

        if not os.path.exists(index_path) or not os.path.exists(meta_path):
            return False

        self.index = faiss.read_index(index_path)

        with open(meta_path, "rb") as f:
            data = pickle.load(f)
            self.chunks = data["chunks"]
            self.metadatas = data["metadatas"]
            self.dimension = data["dimension"]

        print(f"FAISS index loaded from {path}/ ({self.index.ntotal} vectors).")
        return True


# Global singleton instance
vector_store = VectorStore()
