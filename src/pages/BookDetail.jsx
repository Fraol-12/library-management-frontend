// src/pages/BookDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/client';
import toast from 'react-hot-toast';

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${id}/`);
        setBook(res.data);
      } catch (err) {
        toast.error("Book not found");
        navigate('/catalog');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, navigate]);

  const handleBorrow = async () => {
    try {
      await api.post('/loans/', {
        book: id,
        due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      });
      toast.success("Book borrowed successfully!");
      navigate('/dashboard');
    } catch (err) {
      // handled by interceptor
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading book details...</div>;
  }

  if (!book) return null;

  const isAvailable = book.is_available !== false;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <button 
          onClick={() => navigate('/catalog')}
          className="mb-8 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          ← Back to Catalog
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Large Cover */}
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            {book.cover_image ? (
              <img src={book.cover_image} alt={book.title} className="w-full" />
            ) : (
              <div className="bg-gradient-to-br from-blue-100 to-indigo-200 h-[520px] flex items-center justify-center text-9xl">
                📖
              </div>
            )}
          </div>

          {/* Right - Details */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-3">{book.title}</h1>
            <p className="text-2xl text-gray-600 mb-10">by {book.author}</p>

            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <p className="text-gray-500 text-sm">ISBN</p>
                <p className="font-mono">{book.isbn}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <span className={`inline-block px-5 py-1.5 rounded-full text-sm font-semibold ${
                  isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {isAvailable ? 'Available' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="mb-12">
              <p className="text-gray-500 text-sm mb-3">Synopsis</p>
              <p className="text-gray-700 leading-relaxed">
                {book.description || "No description available."}
              </p>
            </div>

            {isAvailable && (
              <button
                onClick={handleBorrow}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold text-lg transition-all active:scale-95"
              >
                Borrow This Book
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}