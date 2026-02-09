// src/pages/Dashboard.jsx
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Member Dashboard</h1>
      <p className="mt-4">
        Authenticated: {isAuthenticated ? 'Yes' : 'No'}
      </p>
      {isAuthenticated && (
        <button
          onClick={logout}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      )}
    </div>
  );
}