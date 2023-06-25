import axios from 'axios';

export const fetchKanjiData = async (kanji) => {
  try {
    const response = await axios.get(`https://kanjialive-api.p.rapidapi.com/api/public/kanji/${kanji}`, {
      headers: {
        'X-RapidAPI-Key': '7735c1c38fmsh60ea14ac6f9fd18p1abb1ejsne83037eae0b6',
        'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

