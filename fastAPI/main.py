from fastapi import FastAPI, File, UploadFile
import shutil
import os
from model import PdfProcessor  

app = FastAPI()

google_api_key = "AIzaSyD_AM1vtBozbFogrkUUoviWmljs78KBLkI"
pdf_processor = PdfProcessor(google_api_key)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):

    file_location = os.path.join(UPLOAD_DIR, file.filename)
    print(file_location)
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    print("in n")
    
    return {"filename": file.filename}

@app.get("/list-pdfs/")
async def list_pdfs():
    files = os.listdir(UPLOAD_DIR)
    return {"files": files}


@app.post("/interact-pdf/")
async def interact_pdf(filename: str, question: str = ""):
    file_location = os.path.join(UPLOAD_DIR, filename)
    print(file_location)
    
    if not os.path.exists(file_location):
        return {"error": "File not found"}
    
    result = pdf_processor.get_answer(file_location, question)
    
    return {"filename": filename, "answer": result}

@app.get("/")
async def read_root():
    return {"Hello": "World"}
