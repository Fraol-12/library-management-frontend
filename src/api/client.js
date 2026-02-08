import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: 'https://library-management-api-ym28.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor – automatically add Bearer token if exists
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

// Response interceptor – handle common errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 = token invalid/expired → redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      toast.error('Session expired. Please log in again.');
      window.location.href = '/login';
    }

    // 403 = forbidden (e.g. non-staff trying staff action)
    else if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action.');
    }

    // 400/422 = validation error
    else if (error.response?.status === 400 || error.response?.status === 422) {
      const message = error.response.data?.detail || 'Invalid input.';
      toast.error(message);
    }

    // Network error or 500
    else {
      toast.error('Something went wrong. Please try again later.');
    }

    return Promise.reject(error);
  }
);

export default api;