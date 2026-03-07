// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoanCard from '../components/loan/LoanCard';
import api from '../api/client';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeLoans, setActiveLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLoans = async () => {
    try {
      const response = await api.get('/loans/my-active/');
      setActiveLoans(response.data.results || response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleReturnSuccess = () => {
    fetchLoans(); // refresh list
  };

  const overdueCount = activeLoans.filter(l => l.is_overdue).length;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Member Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user?.username}</p>
          </div>

          <div className="flex gap-6">
            <div className="bg-white px-8 py-4 rounded-3xl shadow-sm text-center">
              <div className="text-3xl font-bold text-emerald-600">{activeLoans.length}</div>
              <div className="text-sm text-gray-500">ACTIVE LOANS</div>
            </div>

            <div className="bg-white px-8 py-4 rounded-3xl shadow-sm text-center">
              <div className="text-3xl font-bold text-red-600">{overdueCount}</div>
              <div className="text-sm text-gray-500">OVERDUE</div>
            </div>
          </div>

          <button
            onClick={logout}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        </div>

        {/* Action Required Banner */}
        {overdueCount > 0 && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-10 flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <span className="font-medium">Action Required: You have {overdueCount} overdue book(s). Please return them as soon as possible.</span>
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-6">Active Loans</h2>

        {loading ? (
          <p>Loading loans...</p>
        ) : activeLoans.length === 0 ? (
          <p className="text-gray-500">No active loans. Start borrowing books from the catalog!</p>
        ) : (
          <div className="space-y-6">
            {activeLoans.map(loan => (
              <LoanCard 
                key={loan.id} 
                loan={loan} 
                onReturnSuccess={handleReturnSuccess} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}