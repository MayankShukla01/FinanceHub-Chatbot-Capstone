import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
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
