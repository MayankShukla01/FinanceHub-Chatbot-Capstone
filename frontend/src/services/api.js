import axios from 'axios';

// In production (Render), VITE_API_URL points to the backend service
// In dev, Vite proxy handles /api -> localhost:8000
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000,
});

export async function sendMessage(message, history = []) {
  const { data } = await api.post('/chat', { message, history });
  return data;
}

export async function getTopics() {
  const { data } = await api.get('/topics');
  return data;
}

export async function getMarketData() {
  const { data } = await api.get('/market-data');
  return data;
}

export default api;
