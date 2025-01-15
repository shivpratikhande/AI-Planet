from IPython.display import display
from IPython.display import Markdown
import textwrap


def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

import google.generativeai as genai

import os
genai.configure(api_key="IzaSyD_AM1vtBozbFogrkUUoviWmljs78KBLkI")

model = genai.GenerativeModel(model_name = "gemini-pro")
model

from langchain_google_genai import ChatGoogleGenerativeAI
llm = ChatGoogleGenerativeAI(model="gemini-pro",google_api_key="AIzaSyD_AM1vtBozbFogrkUUoviWmljs78KBLkI")
result = llm.invoke("What is the name shiva means")
print(to_markdown(result.content))
print("this is printed",result.content)


