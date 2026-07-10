"""LangChain-based document loader and text splitter."""

import os
from pathlib import Path
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from app.config import settings


def load_and_split() -> tuple[list[str], list[dict]]:
    """Load all .txt documents from the knowledge directory and split into chunks.

    Returns:
        Tuple of (chunks, metadatas) where:
        - chunks: list of text strings
        - metadatas: list of metadata dicts with 'source' and 'category' keys
    """
    knowledge_dir = Path(settings.KNOWLEDGE_DIR)

    if not knowledge_dir.exists():
        raise FileNotFoundError(f"Knowledge directory not found: {knowledge_dir}")

    # Find all .txt files
    txt_files = sorted(knowledge_dir.glob("*.txt"))

    if not txt_files:
        raise FileNotFoundError(f"No .txt files found in {knowledge_dir}")

    print(f"Found {len(txt_files)} knowledge documents.")

    # Load all documents
    all_documents = []
    for txt_file in txt_files:
        try:
            loader = TextLoader(str(txt_file), encoding="utf-8")
            docs = loader.load()
            # Add category metadata based on filename
            category = txt_file.stem.replace("_", " ").title()
            for doc in docs:
                doc.metadata["source"] = txt_file.name
                doc.metadata["category"] = category
            all_documents.extend(docs)
            print(f"  Loaded: {txt_file.name} ({len(docs)} document(s))")
        except Exception as e:
            print(f"  Error loading {txt_file.name}: {e}")

    if not all_documents:
        raise RuntimeError("No documents were successfully loaded.")

    # Split documents into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.CHUNK_SIZE,
        chunk_overlap=settings.CHUNK_OVERLAP,
        length_function=len,
        separators=["\n\n", "\n", ". ", ", ", " ", ""],
    )

    split_docs = text_splitter.split_documents(all_documents)
    print(f"Split into {len(split_docs)} chunks (chunk_size={settings.CHUNK_SIZE}, overlap={settings.CHUNK_OVERLAP}).")

    # Extract text and metadata
    chunks = [doc.page_content for doc in split_docs]
    metadatas = [doc.metadata for doc in split_docs]

    return chunks, metadatas
