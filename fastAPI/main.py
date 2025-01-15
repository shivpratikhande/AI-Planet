from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import fitz  # PyMuPDF for PDF text extraction
import os
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.llms import OpenAI
from langchain.document_loaders import TextLoader
from langchain.vectorstores import FAISS
import shutil
from pathlib import Path

app = FastAPI()

UPLOAD_DIR = "uploads"
Path(UPLOAD_DIR).mkdir(parents=True, exist_ok=True)

@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
    file_location = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)
    
    pdf_text = extract_text_from_pdf(file_location)
    
    doc_id = save_pdf(pdf_text, file.filename)
    
    return {"doc_id": doc_id, "message": "PDF uploaded successfully"}

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def save_pdf(_text, _filename):
    doc_id = 1  # Placeholder for doc_id, replace with actual DB logic
    return doc_id

class QuestionRequest(BaseModel):
    doc_id: int
    question: str

@app.post("/ask_question")
async def ask_question(request: QuestionRequest):
    doc_text = fetch_document_by_id(request.doc_id)
    
    answer = process_question(doc_text, request.question)
    
    return {"answer": answer}

@app.get("/")
async def root():
    return {"message": "Hello World"}

# Placeholder function to fetch document text by ID (would be from a real DB)
def fetch_document_by_id(_doc_id):
    # In a real case, fetch from DB
    # For now, just returning dummy content
    return "This is sample extracted text from the document."

# Function to process the question using LangChain or LLamaIndex
def process_question(doc_text, question):
    # You would use LangChain, FAISS, or LlamaIndex to process the text and generate answers
    # This is a simplified placeholder
    chain = QuestionAnswerChain.from_llm(OpenAI())
    return chain.run(question, doc_text)

# Run the app with: uvicorn main:app --reload
