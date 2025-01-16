from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from model import PdfProcessor  
from fastapi.responses import JSONResponse


app = FastAPI()

origins = [
    "http://localhost:3000",  
    "https://yourfrontenddomain.com", 
    "http://localhost:3001", 

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

google_api_key = "AIzaSyD_AM1vtBozbFogrkUUoviWmljs78KBLkI"
pdf_processor = PdfProcessor(google_api_key)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

class PdfInteractionRequest(BaseModel):
    filename: str
    question: str

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
async def interact_pdf(request: PdfInteractionRequest):
    file_location = os.path.join(UPLOAD_DIR, request.filename)
    print(file_location)
    print(request.question)
    
    if not os.path.exists(file_location):
        raise HTTPException(status_code=404, detail="File not found")
    
    result = pdf_processor.get_answer(file_location, request.question)
    
    return JSONResponse(content= {"filename": request.filename, "answer": result})

@app.get("/")
async def read_root():
    return {"Hello": "World"}