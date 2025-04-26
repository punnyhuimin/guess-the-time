from fastapi import APIRouter
from pydantic import BaseModel, Field

from src.crud import get_all_guesses, save_guess, get_winners

router = APIRouter()

class UserInput(BaseModel):
    name: str = Field(..., example="Alice")
    guessedTimeInMs: int = Field(..., example=125, description="Time in seconds")

@router.get("/guesses")
async def read_guesses():
    guesses = await get_all_guesses()
    return {"guesses": guesses}

@router.get("/results")
async def get_results():
    winners = await get_winners()
    return {"winners": winners}

@router.post("/submit")
async def submit_input(data: UserInput):
    await save_guess(data)
    return {
        "message": "Input received",
        "name": data.name,
        "guessedTimeInMs": data.guessedTimeInMs,
    }

@router.get("/ping")
async def ping():
    return {"message": "pong"}
