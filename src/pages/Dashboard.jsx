import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Welcome back, {user?.username || 'Member'}</h1>
      <p className="mt-4">This is your member dashboard.</p>

      <button
        onClick={logout}
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}