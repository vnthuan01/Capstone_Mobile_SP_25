import axios from 'axios';

const api = axios.create({
  baseURL:
  process.env.EXPO_PUBLIC_API_URL,
  timeout: 30000,
});

api.interceptors.request.use(
  async (config) => {
    // Thêm header Authorization
    // Import động để tránh circular dependency
    const { useAuthStore } = require('../store/authStore');
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      console.warn('401 Unauthorized - Token expired or invalid');
      // Import động để tránh circular dependency
      const { useAuthStore } = require('../store/authStore');
      useAuthStore.getState().logout();
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
      // Có thể là timeout hoặc no internet
      if (error.code === 'ECONNABORTED') {
        console.error('Request timeout');
      }
    }

    // Handle server errors
    if (error.response?.status >= 500) {
      console.error(
        'Server error:',
        error.response.status,
        error.response.data,
      );
    }

    console.error('API error:', error);
    return Promise.reject(error);
  },
);

export default api;
