from loguru import logger
from src.database import mongo

async def save_guess(guess):
    print(guess)
    collection = mongo.db["guesses"] 
    result = await collection.insert_one(guess.dict())
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
    target_value = 1000
    pipeline = [
        {
            "$addFields": {
                "diff": { "$abs": { "$subtract": ["$guessedTimeInMs", target_value] } }
            }
        },
        { "$sort": { "diff": 1 } },
        { "$limit": 3 },
        {
            "$project": {"_id": 0, "name": 1, "guessedTimeInMs": 1, "diff": 1}
        }
    ]

    cursor = mongo.db["guesses"].aggregate(pipeline)
    results = await cursor.to_list(length=3)
    
    return results
