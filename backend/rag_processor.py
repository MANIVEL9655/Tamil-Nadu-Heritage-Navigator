from langchain.document_loaders import PyPDFLoader
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
import os

class RAGProcessor:
    def __init__(self, pdf_folder="data"):
        self.pdf_folder = pdf_folder
        self.embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
        self.vector_db = None
        
    def load_and_process_documents(self):
        documents = []
        for pdf_file in os.listdir(self.pdf_folder):
            if pdf_file.endswith(".pdf"):
                loader = PyPDFLoader(os.path.join(self.pdf_folder, pdf_file))
                documents.extend(loader.load())
        
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        texts = text_splitter.split_documents(documents)
        
        self.vector_db = Chroma.from_documents(texts, self.embedding_model)
        return "Documents processed and vector store created"
    
    def query_documents(self, question, k=3):
        if not self.vector_db:
            raise ValueError("Vector database not initialized. Call load_and_process_documents first.")
        
        docs = self.vector_db.similarity_search(question, k=k)
        return "\n\n".join([doc.page_content for doc in docs])