// src/pages/Landing.jsx
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 text-white">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center px-10 py-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white text-indigo-950 rounded-xl flex items-center justify-center font-bold text-2xl">
            📚
          </div>
          <span className="text-2xl font-semibold tracking-tight">LibSaaS</span>
        </div>

        <div className="flex items-center gap-8">
          <Link to="/catalog" className="hover:text-indigo-300 transition">Catalog</Link>
          <Link to="/login" className="hover:text-indigo-300 transition">Login</Link>
          <Link 
            to="/register" 
            className="bg-white text-indigo-950 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-6xl font-bold leading-tight mb-6">
            Knowledge<br />Management
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-md">
            Experience a library system designed for the digital age. Real-time availability, seamless borrowing, and a beautifully crafted interface for modern readers.
          </p>

          <div className="flex gap-4">
            <Link 
              to="/catalog" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition"
            >
              Browse Catalog
            </Link>
            <Link 
              to="/login" 
              className="border-2 border-white/70 hover:bg-white/10 px-10 py-4 rounded-2xl font-semibold text-lg transition"
            >
              Member Login
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <img 
            src="https://picsum.photos/id/1015/800/600" 
            alt="Library interior" 
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </div>

      {/* Feature Cards */}
      <div className="bg-white text-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6">⚡</div>
            <h3 className="text-2xl font-semibold mb-3">Instant Availability</h3>
            <p className="text-gray-600">Check real-time stock of your favorite titles. Our system updates instantly to prevent disappointment.</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-3xl mb-6">📜</div>
            <h3 className="text-2xl font-semibold mb-3">Fair Access Policy</h3>
            <p className="text-gray-600">Automated limits ensure fair access for everyone. Max 5 books per user, strict return policies.</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6">📊</div>
            <h3 className="text-2xl font-semibold mb-3">Member Dashboard</h3>
            <p className="text-gray-600">Track your reading history, manage active loans, and view due dates in one centralized hub.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-gray-400 py-12 text-center">
        <p>Built by LibSaaS Inc. The modern standard for library management.</p>
      </footer>
    </div>
  );
}