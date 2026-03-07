import { createContext, useContext, useState } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token") || null);

  const isAuthenticated = !!token;

  // LOGIN
  const login = async ({ username, password }) => {
    try {
      const response = await api.post("token/", { username, password });
      const { access } = response.data;

      localStorage.setItem("access_token", access);
      setToken(access);

      // Optional: don't fail login if /me/ is unavailable
      try {
        const meResponse = await api.get("me/");
        setUser(meResponse.data);
      } catch {
        setUser(null);
      }

      return true;
    } catch (err) {
      localStorage.removeItem("access_token");
      setToken(null);
      setUser(null);
      console.error("Login failed:", err.response?.data || err.message);
      return false;
    }
  };

  // REGISTER
  const register = async ({ username, email, password, password2 }) => {
    try {
      await api.post("register/", { username, email, password, password2 });

      // Auto-login after successful registration
      return await login({ username, password });
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      return false;
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
