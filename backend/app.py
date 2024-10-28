from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from ai import getAnswers

app = FastAPI()

allowed_origins = [
    "chrome-extension://*",
    "http://localhost:8000"  # Allow local testing
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,  # Allow only specified origins
    allow_credentials=True,
    allow_methods=["POST"],  # Only POST requests to /questions
    allow_headers=["*"],  # Allow all headers
)

class QuestionItem(BaseModel):
    options: List[str]
    question: str
    question_number: int
    required: bool
    type: str

@app.post("/questions")
async def create_questions(questions: List[QuestionItem]):
    return getAnswers(questions)
