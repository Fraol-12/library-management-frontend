// src/pages/StaffDashboard.jsx
import { useState, useEffect } from 'react';
import api from '../api/client';
import toast from 'react-hot-toast';

export default function StaffDashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books/');
      setBooks(res.data.results || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    try {
      await api.delete(`/books/${id}/`);
      toast.success('Book deleted');
      fetchBooks();
    } catch (err) {
      toast.error('Failed to delete book');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Staff Dashboard</h1>

        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-2xl font-semibold mb-6">All Books</h2>

          {loading ? (
            <p>Loading books...</p>
          ) : (
            <div className="space-y-4">
              {books.map(book => (
                <div key={book.id} className="flex justify-between items-center p-4 border rounded-2xl">
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                  </div>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}