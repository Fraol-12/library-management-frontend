// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/client";
import toast from "react-hot-toast"; // assuming you're using it elsewhere

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token") || null);

  const isAuthenticated = !!token;

  // Auto-restore user on page refresh / mount if token exists
  useEffect(() => {
    if (token && !user) {
      const restoreUser = async () => {
        try {
          const res = await api.get("/me/");
          setUser(res.data);
        } catch {
          // Token exists but /me fails → treat as invalid
          localStorage.removeItem("access_token");
          setToken(null);
          toast.error("Session expired. Please log in again.");
        }
      };
      restoreUser();
    }
  }, [token]);

  const login = async ({ username, password }) => {
    try {
      const response = await api.post("/token/", { username, password });
      const { access } = response.data;

      localStorage.setItem("access_token", access);
      setToken(access);

      // Fetch user profile
      const meResponse = await api.get("/me/");
      setUser(meResponse.data);

      toast.success("Logged in successfully");
      return true;
    } catch (err) {
      // No need to manually remove token here — interceptor can do it on 401
      console.error("Login failed:", err.response?.data || err.message);
      return false;
    }
  };

  const register = async ({ username, email, password, password2 }) => {
    try {
      await api.post("/register/", { username, email, password, password2 });
      toast.success("Account created! Logging you in...");
      // Auto-login
      return await login({ username, password });
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setUser(null);
    toast.success("Logged out");
  };

  const value = {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}