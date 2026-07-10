"""Sentence Transformer embedding wrapper with singleton pattern."""

import numpy as np
from sentence_transformers import SentenceTransformer
from app.config import settings


class EmbeddingModel:
    """Singleton wrapper around SentenceTransformer for text embeddings."""

    _instance = None
    _model = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def load(self):
        """Load the embedding model into memory."""
        if self._model is None:
            print(f"Loading embedding model: {settings.EMBEDDING_MODEL}...")
            self._model = SentenceTransformer(settings.EMBEDDING_MODEL)
            print("Embedding model loaded successfully.")

    def embed_texts(self, texts: list[str]) -> np.ndarray:
        """Encode a list of texts into embedding vectors.

        Args:
            texts: List of text strings to encode.

        Returns:
            numpy array of shape (len(texts), embedding_dim).
        """
        if self._model is None:
            self.load()
        embeddings = self._model.encode(texts, show_progress_bar=True, normalize_embeddings=True)
        return np.array(embeddings, dtype=np.float32)

    def embed_query(self, query: str) -> np.ndarray:
        """Encode a single query string into an embedding vector.

        Args:
            query: The query text to encode.

        Returns:
            numpy array of shape (1, embedding_dim).
        """
        if self._model is None:
            self.load()
        embedding = self._model.encode([query], normalize_embeddings=True)
        return np.array(embedding, dtype=np.float32)


# Global singleton instance
embedding_model = EmbeddingModel()
