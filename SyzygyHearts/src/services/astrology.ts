const ASTRO_API_KEY = 'your-astro-api-key';
const BASE_URL = 'https://api.astrology-api.io';

export interface BirthData {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  latitude: number;
  longitude: number;
}

export const getBirthChart = async (birthData: BirthData) => {
  const response = await fetch(`${BASE_URL}/natal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ASTRO_API_KEY}`
    },
    body: JSON.stringify(birthData)
  });
  return response.json();
};

export const getCompatibility = async (chart1: any, chart2: any) => {
  const response = await fetch(`${BASE_URL}/synastry`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ASTRO_API_KEY}`
    },
    body: JSON.stringify({ chart1, chart2 })
  });
  return response.json();
};

export const getHoroscope = async (sign: string, date: string) => {
  const response = await fetch(`${BASE_URL}/horoscope/${sign}/${date}`, {
    headers: {
      'Authorization': `Bearer ${ASTRO_API_KEY}`
    }
  });
  return response.json();
};