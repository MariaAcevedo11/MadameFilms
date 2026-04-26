import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

// Configura la URL base de tu API
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Interceptor para añadir el token en cada request
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

// Opcional: interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Si el token expira o no es válido, limpiar sesión
      const authStore = useAuthStore();
      authStore.clearSession();
    }

    
    return Promise.reject(error);
  },
);

export default api;
