import axios from 'axios';

const backendBaseUrl =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:5173/api';

export const getResults = async () => {
  const response = await axios.get(`${backendBaseUrl}/guesses`);
  return response.data;
};
