# Full-Stack PDF Question Answering System

This is a full-stack application that allows users to upload PDF documents and ask questions related to their content. The backend processes the PDF using LangChain and Gemini Flash models to provide answers based on the content of the uploaded PDFs. The frontend is built using React.js, and file storage is handled locally.

## Features

- **PDF Upload**: Users can upload PDF documents to the system.
- **Question Answering**: Users can ask questions related to the content of the uploaded PDF, and the system will provide relevant answers.
- **Follow-up Questions**: Users can ask follow-up questions on the same document.
- **Document Storage**: Uploaded PDFs are stored locally for future reference.

## Tools and Technologies

- **Frontend**: React.js
- **Backend**: FastAPI
- **Natural Language Processing (NLP)**: LangChain with Gemini Flash fine-tuned models
- **File Storage**: Local filesystem (for PDF storage)
- **Database**: SQLite (for document metadata storage)

## Installation Instructions

### Prerequisites

- Python 3.x
- Node.js and npm
- pip (Python package manager)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fullstack-pdf-qa-system.git
   cd fullstack-pdf-qa-system

   python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
cd frontend
npm install
npm start


Local File Storage
Uploaded PDFs will be stored locally in a folder defined in the backend configuration. Ensure that the folder has the appropriate read/write permissions.

Database
The application uses a simple SQLite database for storing document metadata (e.g., filename, upload date). No advanced setup is needed as SQLite is serverless and stored locally.

NLP Model
This application integrates LangChain with Gemini Flash fine-tuned models for retrieving and answering questions based on the content of the uploaded PDF. These models are loaded dynamically during question answering.

Environment Variables
Ensure you have the necessary environment variables set for the backend and NLP configurations, such as API keys for the Gemini Flash models, if applicable.

Usage
Upload PDF:
Navigate to the PDF upload section on the frontend.
Select and upload a PDF file.
The file will be processed and stored locally.
Ask Questions:
Once the PDF is uploaded, users can type their questions related to the document.
The system will use LangChain and Gemini Flash to process the document and generate an answer.
Follow-up Questions:
After receiving an answer, users can ask follow-up questions related to the same document.
View Answers:
The answer will be displayed below the question input.
API Endpoints
1. Upload PDF
Endpoint: POST /upload
Description: Allows users to upload PDF files.
Request Body:
file: The PDF file to be uploaded (multipart/form-data).
Response:
status: success or error.
message: Message indicating the result.
2. Ask Question
Endpoint: POST /ask
Description: Accepts a question and retrieves an answer based on the uploaded PDF content.
Request Body:
question: The question to ask.
document_id: The ID of the uploaded document.
Response:
answer: The generated answer to the question.
Demo
You can check out the live demo at [link_to_demo].

Evaluation Criteria
Functionality: Meets all functional requirements including PDF upload, question answering, and follow-up questions.
Code Quality: Code is clean, well-commented, and organized.
User Interface: The application is intuitive and user-friendly.
Innovation: Any added features or optimizations are welcome!
License
This project is licensed under the MIT License - see the LICENSE file for details.

markdown
Copy

2. **Set Up the Project:**

   **Backend Setup**:

   - Clone the repository and set up the backend environment:
     ```bash
     git clone https://github.com/yourusername/fullstack-pdf-qa-system.git
     cd fullstack-pdf-qa-system
     python -m venv venv
     source venv/bin/activate  # For Windows: venv\Scripts\activate
     pip install -r requirements.txt
     ```

   - Start the backend server:
     ```bash
     uvicorn main:app --reload
     ```

     The backend will be running at `http://localhost:8000`.

   **Frontend Setup**:

   - Navigate to the frontend directory and install npm packages:
     ```bash
     cd frontend
     npm install
     ```

   - Start the frontend development server:
     ```bash
     npm start
     ```

     The frontend will be running at `http://localhost:3000`.

3. **Testing and Usage**:
   - Visit the frontend in your browser (`http://localhost:3000`).
   - Upload PDF files and ask questions based on the document content.
   - The backend will process the questions and return answers using the LangChain and Gemini Flash models.

### Demo:
If you have a live demo, replace `ai-planet-kappa.vercel.app` with the actual link.

---


