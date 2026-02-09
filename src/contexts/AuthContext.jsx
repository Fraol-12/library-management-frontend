import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // ────────────────────────────────────────────────
  // Global state – single source of truth for auth
  // ────────────────────────────────────────────────
  const [user, setUser] = useState(null);               // { username, email, is_staff, ... }
  const [token, setToken] = useState(
    localStorage.getItem('access_token') || null
  );

  // Derived state – convenient for components
  const isAuthenticated = !!token;

  // ────────────────────────────────────────────────
  // Auth methods (placeholders – real logic tomorrow)
  // ────────────────────────────────────────────────
  const login = async (credentials) => {
    console.log('Login called with:', credentials);
    // Tomorrow: POST /api/token/ → save token + user
    // For now: simulate success
    // localStorage.setItem('access_token', 'fake-token');
    // setToken('fake-token');
    // setUser({ username: 'demo' });
  };

  const register = async (data) => {
    console.log('Register called with:', data);
    // Tomorrow: POST /api/register/ → auto-login
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setUser(null);
    console.log('User logged out');
  };

  // Value object passed to all consumers
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

// Custom hook – must be used inside <AuthProvider>
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}