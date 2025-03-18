import spacy
import os
import pandas as pd

nlp = spacy.load("en_core_web_sm")

PROCESSED_DATA_PATH = "backend/data/processed_data"

def extract_entities(text):
    """Extract heritage-related entities using spaCy NER."""
    doc = nlp(text)
    entities = {}
    
    for ent in doc.ents:
        if ent.label_ in ["GPE", "PERSON", "ORG", "DATE"]:  # Customize based on heritage site data
            entities[ent.text] = ent.label_

    return entities

def process_text_files():
    """Process extracted text files and extract relevant entities."""
    structured_data = {}

    for file in os.listdir(PROCESSED_DATA_PATH):
        if file.endswith(".txt"):
            with open(os.path.join(PROCESSED_DATA_PATH, file), "r", encoding="utf-8") as f:
                text = f.read()
                structured_data[file] = extract_entities(text)

    return structured_data

if __name__ == "__main__":
    data = process_text_files()
    # print(data)

df=pd.DataFrame(data=data)
print(df)