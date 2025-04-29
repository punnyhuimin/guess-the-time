import axios from 'axios';

const serverBaseUrl =
  import.meta.env.VITE_SERVER_URL || 'http://localhost:5173/api';

export const getGuesses = async () => {
  const response = await axios.get(`${serverBaseUrl}/guesses`);
  return response.data;
};
