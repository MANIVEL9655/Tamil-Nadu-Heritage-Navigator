import faiss
from sentence_transformers import SentenceTransformer
import numpy as np
import os

PROCESSED_DATA_PATH = "backend/data/processed_data"
EMBEDDINGS_PATH = "backend/data/embeddings"
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"

# Load embedding model
model = SentenceTransformer(MODEL_NAME)

def generate_embeddings():
    """Generate FAISS embeddings for processed heritage data."""
    if not os.path.exists(EMBEDDINGS_PATH):
        os.makedirs(EMBEDDINGS_PATH)

    texts = []
    file_names = []
    
    for file in os.listdir(PROCESSED_DATA_PATH):
        if file.endswith(".txt"):
            with open(os.path.join(PROCESSED_DATA_PATH, file), "r", encoding="utf-8") as f:
                text = f.read()
                texts.append(text)
                file_names.append(file)

    # Convert text to embeddings
    embeddings = model.encode(texts, convert_to_numpy=True)
    
    # Create FAISS index
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings)

    # Save FAISS index
    faiss.write_index(index, os.path.join(EMBEDDINGS_PATH, "faiss_index.bin"))

    # Save metadata for mapping
    with open(os.path.join(EMBEDDINGS_PATH, "metadata.txt"), "w", encoding="utf-8") as f:
        for i, file in enumerate(file_names):
            f.write(f"{i},{file}\n")

    print("FAISS embeddings stored successfully.")

if __name__ == "__main__":
    generate_embeddings()
