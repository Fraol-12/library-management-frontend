// src/components/book/BookCard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';
import toast from 'react-hot-toast';

export default function BookCard({ book }) {
  const [isBorrowing, setIsBorrowing] = useState(false);
  const navigate = useNavigate();

  const isAvailable = book.is_available !== false;

  const handleBorrow = async () => {
    if (!isAvailable) return;

    setIsBorrowing(true);

    try {
      await api.post('/loans/', {
        book: book.id,
        due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
      });

      toast.success('Book borrowed successfully!');
      
      // Refresh the catalog to update availability
      window.location.reload();
    } catch (err) {
      // Error toast already handled by Axios interceptor
    } finally {
      setIsBorrowing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 group">
      {/* Book Cover */}
      <div className="relative h-64 bg-gray-100">
        {book.cover_image ? (
          <img 
            src={book.cover_image} 
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <span className="text-7xl opacity-30">📚</span>
          </div>
        )}

        {/* Availability Badge */}
        <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
          isAvailable 
            ? 'bg-emerald-100 text-emerald-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {isAvailable ? 'Available' : 'Out of Stock'}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-gray-900 mb-1">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          by {book.author}
        </p>

        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/books/${book.id}`)}
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
          >
            View Details →
          </button>

          {isAvailable && (
            <button 
              onClick={handleBorrow}
              disabled={isBorrowing}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white text-sm font-medium px-6 py-2 rounded-xl transition-all active:scale-95"
            >
              {isBorrowing ? 'Borrowing...' : 'Borrow'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}