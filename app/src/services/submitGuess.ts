import axios from 'axios';

const serverBaseUrl =
  import.meta.env.VITE_SERVER_URL || 'http://localhost:5173/api';

export const submitGuess = async (name: string, guessedTimeInMs: number) => {
  const response = await axios.post(`${serverBaseUrl}/submit`, {
    name,
    guessedTimeInMs,
  });
  return response.data;
};
