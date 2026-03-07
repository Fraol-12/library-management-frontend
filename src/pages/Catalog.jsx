// src/pages/Catalog.jsx
import { useState, useEffect } from 'react';
import api from '../api/client';
import BookCard from '../components/book/BookCard';

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' or 'available'

  // Fetch books from backend
  const fetchBooks = async () => {
    setLoading(true);
    try {
      let url = '/books/';
      const params = new URLSearchParams();

      if (searchTerm) params.append('search', searchTerm);
      if (filter === 'available') params.append('available', 'true');

      if (params.toString()) url += '?' + params.toString();

      const response = await api.get(url);
      setBooks(response.data.results || response.data); // handle pagination later
    } catch (err) {
      console.error('Failed to fetch books:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when search or filter changes
  useEffect(() => {
    fetchBooks();
  }, [searchTerm, filter]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Library Catalog</h1>

          {/* Search + Filter */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Books</option>
              <option value="available">Available Now</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm h-96 animate-pulse" />
            ))}
          </div>
        )}

        {/* Book Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        {!loading && books.length === 0 && (
          <p className="text-center text-gray-500 text-xl py-20">
            No books found.
          </p>
        )}
      </div>
    </div>
  );
}