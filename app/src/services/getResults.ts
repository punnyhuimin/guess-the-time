import axios from 'axios';

const serverBaseUrl =
  import.meta.env.VITE_SERVER_URL || 'http://localhost:5173/api';

export const getResults = async () => {
  const response = await axios.get(`${serverBaseUrl}/results`);
  return response.data;
};
