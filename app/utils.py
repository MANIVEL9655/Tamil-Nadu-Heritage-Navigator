import whisper
from gtts import gTTS
import os
import uuid

whisper_model = whisper.load_model("base")

def transcribe_audio(audio_path: str):
    result = whisper_model.transcribe(audio_path)
    return result["text"]

def text_to_speech(text: str, lang: str = "en"):
    audio_filename = f"audio_{uuid.uuid4().hex}.mp3"
    tts = gTTS(text=text, lang=lang)
    audio_path = os.path.join("app", "static", audio_filename)
    tts.save(audio_path)
    return audio_path
