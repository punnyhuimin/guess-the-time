import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const submitGuess = async (name: string, guessedTimeInMs: number) => {
  const response = await axios.post(`${BASE_URL}/submit`, {
    name,
    guessedTimeInMs,
  });
  return response.data;
};
