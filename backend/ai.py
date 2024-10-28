import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
)

def getAnswers(questions):

    chat_session = model.start_chat(
    history=[
    ]
    )

    with open("INSTRUCTIONS.txt", "r") as file:
        instructions = file.read()

    response = chat_session.send_message(f"{instructions}\nHERE ARE THE QUESTIONS:\n{questions}")
    return response.text