import axios from 'axios';

const BASE_URL = 'https://mazii.net/api';

export const fetchMaziiData = async (kanji) => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/mazii/${kanji}/1`,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};
