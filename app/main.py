from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from app.rag_chain import get_qa_chain, create_vectorstore
from app.utils import transcribe_audio, text_to_speech
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend domain in prod
    allow_methods=["*"],
    allow_headers=["*"],
)

qa_chain = get_qa_chain()

@app.post("/ask/")
async def ask_question(prompt: str = Form(...)):
    response = qa_chain.run(prompt)
    return {"response": response}

@app.post("/voice-query/")
async def voice_query(file: UploadFile = File(...), lang: str = Form("en")):
    filepath = f"temp_{file.filename}"
    with open(filepath, "wb") as f:
        f.write(await file.read())

    question = transcribe_audio(filepath)
    response = qa_chain.run(question)
    audio_path = text_to_speech(response, lang)

    return {
        "question": question,
        "answer": response,
        "audio_path": audio_path.replace("app/", "")  # for FileResponse
    }

@app.get("/static/{filename}")
async def serve_audio(filename: str):
    return FileResponse(path=f"app/static/{filename}")
