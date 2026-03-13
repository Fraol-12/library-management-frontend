// src/components/layout/Header.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            L
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">Libre.</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link 
            to="/catalog" 
            className="text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Catalog
          </Link>

          {isAuthenticated ? (
            <>
              {/* Member links */}
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Dashboard
              </Link>

              {/* Staff-only link */}
              {user?.is_staff && (
                <Link 
                  to="/staff/dashboard" 
                  className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
                >
                  Staff Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Logout
              </button>

              {/* User avatar / name (optional polish) */}
              <span className="text-gray-600">
                {user?.username}
              </span>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}