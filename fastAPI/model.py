import textwrap
from pathlib import Path
from langchain import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings

class PdfProcessor:
    def __init__(self, google_api_key, model="gemini-pro", embedding_model="models/embedding-001"):
        self.model = ChatGoogleGenerativeAI(
            model=model,
            google_api_key=google_api_key,
            temperature=0.2,
            convert_system_message_to_human=True
        )
        self.embeddings = GoogleGenerativeAIEmbeddings(
            model=embedding_model,
            google_api_key=google_api_key
        )
    
    def process_pdf(self, file_path):
        pdf_loader = PyPDFLoader(file_path)
        pages = pdf_loader.load_and_split()

        text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
        context = "\n\n".join(str(p.page_content) for p in pages)
        texts = text_splitter.split_text(context)

        vector_index = Chroma.from_texts(texts, self.embeddings).as_retriever(search_kwargs={"k": 5})

        template = """Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. Keep the answer as concise as possible. Always say "thanks for asking!" at the end of the answer.
        {context}
        Question: {question}
        Helpful Answer:"""
        QA_CHAIN_PROMPT = PromptTemplate.from_template(template)

        qa_chain = RetrievalQA.from_chain_type(
            self.model,
            retriever=vector_index,
            return_source_documents=True,
            chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
        )

        return qa_chain

    def get_answer(self, file_path, question):
        qa_chain = self.process_pdf(file_path)
        result = qa_chain({"query": question})
        return result["result"]

if __name__ == "__main__":
    google_api_key = "AIzaSyD_AM1vtBozbFogrkUUoviWmljs78KBLkI"  
    pdf_processor = PdfProcessor(google_api_key)

    file_path = "uploads/file.pdf"  
    question = "Can you summarize the contents of the PDF?"

    answer = pdf_processor.get_answer(file_path, question)

    print("Answer:", answer)
