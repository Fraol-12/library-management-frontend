import { Navigate, Outlet } from 'react-router-dom';

// Placeholder — we'll connect real auth tomorrow
const isAuthenticated = false; // ← temporary hardcode

export default function PrivateRoute() {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}