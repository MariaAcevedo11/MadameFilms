// External imports
import axios from 'axios';

// Internal imports
import { useAuthStore } from '@/stores/authStore';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  }

  // Log para verificar
  console.log('Request URL:', config.url);
  console.log('Request Headers:', config.headers);

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore();
      authStore.clearSession();
    }

    return Promise.reject(error);
  },
);

export default api;
