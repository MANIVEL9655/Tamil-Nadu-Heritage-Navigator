from pdfminer.high_level import extract_text
import pdfminer
import os

RAW_DATA_PATH = "backend/data/raw_data"
PROCESSED_DATA_PATH = "backend/data/processed_data"

def extract_text_from_pdfs():
    """Extract text from all PDFs in raw_data directory."""
    if not os.path.exists(PROCESSED_DATA_PATH):
        os.makedirs(PROCESSED_DATA_PATH)

    for file in os.listdir(RAW_DATA_PATH):
        if file.endswith(".pdf"):
            pdf_path = os.path.join(RAW_DATA_PATH, file)
            text = extract_text(pdf_path)
            text_file = os.path.join(PROCESSED_DATA_PATH, file.replace(".pdf", ".txt"))
            
            with open(text_file, "w", encoding="utf-8") as f:
                f.write(text)
            print(f"Processed: {file}")

if __name__ == "__main__":
    extract_text_from_pdfs()
