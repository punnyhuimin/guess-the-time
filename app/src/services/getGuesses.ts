import axios from 'axios';

const backendBaseUrl =
  import.meta.env.SERVER_URL || 'http://localhost:5173/api';

export const getGuesses = async () => {
  const response = await axios.get(`${backendBaseUrl}/guesses`);
  return response.data;
};
