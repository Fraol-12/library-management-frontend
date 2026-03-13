import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function StaffRoute() {
  const { isAuthenticated, user } = useAuth();

  // Not logged in at all → go to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in, but not staff → go back to normal dashboard (or show 403 page)
  if (!user?.is_staff) {
    return <Navigate to="/dashboard" replace />;
  }

  // Is staff → allow access
  return <Outlet />;
}