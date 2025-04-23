from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.llms import LlamaCpp
from langchain.chains import RetrievalQA
import os

PERSIST_DIR = "embeddings/"
PDF_DIR = "app/data/"
GGUF_PATH = "app/models/llama-2-7b-chat.Q4_K_M.gguf"

def create_vectorstore():
    loader = PyPDFLoader(os.path.join(PDF_DIR, "your_pdf.pdf"))
    docs = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(docs)

    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    vectordb = Chroma.from_documents(chunks, embedding=embeddings, persist_directory=PERSIST_DIR)
    vectordb.persist()
    return vectordb

def load_vectorstore():
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    return Chroma(persist_directory=PERSIST_DIR, embedding_function=embeddings)

def get_qa_chain():
    llm = LlamaCpp(
        model_path=GGUF_PATH,
        temperature=0.7,
        max_tokens=512,
        top_p=0.95,
        n_ctx=2048,
        n_batch=512,
        f16_kv=True,
        verbose=True
    )
    vectordb = load_vectorstore()
    return RetrievalQA.from_chain_type(llm=llm, retriever=vectordb.as_retriever())
