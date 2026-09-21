import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7105/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach JWT token from localStorage
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Graceful logging & handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optional: clear auth on explicit unauthorized if expired
      const isAuthRequest = error.config.url?.includes('/auth/');
      if (!isAuthRequest) {
        // Can optionally clear token if expired
        // localStorage.removeItem('token');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { API_BASE_URL };
