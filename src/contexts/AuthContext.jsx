// src/contexts/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import api from '../api/client'; // ← your Axios instance

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('access_token') || null);

  const isAuthenticated = !!token;

  const login = async ({ username, password }) => {
    try {
      const response = await api.post('/token/', { username, password });
      const { access } = response.data;

      localStorage.setItem('access_token', access);
      setToken(access);

      // Optional: fetch user info if your backend returns it
      // For now we can just set a basic user object
      setUser({ username });

      return true; // success
    } catch (err) {
      // Errors are already toasted by interceptor
      return false;
    }
  };

  const register = async ({ username, email, password, password2 }) => {
    try {
      await api.post('/register/', {
        username,
        email,
        password,
        password2,
      });

      // Auto-login after register (common UX)
      await login({ username, password });

      return true;
    } catch (err) {
      // Errors toasted by interceptor
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}