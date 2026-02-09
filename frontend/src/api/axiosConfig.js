import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Normalizar sin barra final para evitar URLs con doble //
const baseURL = API_URL.replace(/\/+$/g, '');

const apiAxios = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiAxios;
