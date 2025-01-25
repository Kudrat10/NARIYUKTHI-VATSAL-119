from fastapi import FastAPI, Form
from pydantic import BaseModel
from transformers import pipeline
from googletrans import Translator

app = FastAPI()

# Load an NLP model for response generation
chat_model = pipeline("text-generation", model="gpt2")
translator = Translator()

# Supported languages
LANGUAGES = {
    "en": "English",
    "es": "Spanish",
    "fr": "French",
    "de": "German",
    "zh-cn": "Chinese (Simplified)",
    "hi": "Hindi",
    "ar": "Arabic",
    "ru": "Russian",
    "ja": "Japanese",
    "pt": "Portuguese"
}

@app.post("/chat/")
async def chat(input_text: str = Form(...), target_language: str = Form("en")):
    # Generate a response in English
    response = chat_model(input_text, max_length=50, num_return_sequences=1)[0]["generated_text"]
    
    # Translate the response into the target language
    translated_response = translator.translate(response, dest=target_language).text

    return {
        "original_response": response,
        "translated_response": translated_response,
        "language": LANGUAGES.get(target_language, "Unknown")
    }
