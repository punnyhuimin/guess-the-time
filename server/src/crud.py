from loguru import logger
from src.database import mongo
from datetime import datetime, timezone

async def save_guess(guess):
    collection = mongo.db["guesses"] 
    guess_data = guess.dict()
    guess_data["createdAt"] = datetime.now(timezone.utc)
    result = await collection.insert_one(guess_data)
    return str(result.inserted_id)

def serialize_guess(guess) -> dict:
    return {
        "id": str(guess["_id"]),
        "name": guess["name"],
        "guessedTimeInMs": guess["guessedTimeInMs"],
    }

async def get_all_guesses():
    logger.info(f"Connecting to: {mongo.uri}")
    collection = mongo.db["guesses"]
    cursor = collection.find()
    return [serialize_guess(g) async for g in cursor]

async def get_winners():
    correct_answer_doc = await mongo.db["guesses"].find_one({"name": "correct_answer_123"})

    if not correct_answer_doc:
        return {
            "correct_answer": None,
            "winners": []
        }

    correct_answer_value = correct_answer_doc["guessedTimeInMs"]

    pipeline = [
        { 
            "$match": { "name": { "$ne": "correct_answer_123" } }  # exclude correct_answer_123
        },
        {
            "$addFields": {
                "diff": { "$abs": { "$subtract": ["$guessedTimeInMs", correct_answer_value] } }
            }
        },
        { "$sort": { "diff": 1 } },
        { "$limit": 5 },
        {
            "$project": {"_id": 0, "name": 1, "guessedTimeInMs": 1, "diff": 1}
        }
    ]

    cursor = mongo.db["guesses"].aggregate(pipeline)
    results = await cursor.to_list(length=3)
    return {"winners": results, "correct_answer": correct_answer_value}
