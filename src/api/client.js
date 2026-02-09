// src/api/client.js
import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: 'https://library-management-api-ym28.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10s timeout – prevents hanging forever
});

// Request interceptor: attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: global error handling + UX feedback
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Common cases we want to handle nicely
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // Token invalid/expired
        localStorage.removeItem('access_token');
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login';
      } else if (status === 403) {
        toast.error('You do not have permission to do this.');
      } else if (status === 400 || status === 422) {
        // Validation or bad request
        const message = error.response.data?.detail || 'Invalid request.';
        toast.error(message);
      } else if (status >= 500) {
        toast.error('Server error — please try again later.');
      }
    } else if (error.request) {
      // Network error (no response)
      toast.error('Network error. Check your connection.');
    } else {
      toast.error('Something went wrong.');
    }

    return Promise.reject(error);
  }
);

export default api;