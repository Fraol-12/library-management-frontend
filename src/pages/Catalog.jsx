// src/pages/Catalog.jsx
import { useState, useEffect } from 'react';
import api from '../api/client';
import BookCard from '../components/book/BookCard';

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchBooks = async () => {
    setLoading(true);
    try {
      let url = '/books/';
      const params = new URLSearchParams();

      if (searchTerm) params.append('search', searchTerm);
      if (filter === 'available') params.append('available', 'true');

      if (params.toString()) url += '?' + params.toString();

      const response = await api.get(url);
      setBooks(response.data.results || response.data);
    } catch (err) {
      console.error('Failed to fetch books:', err);
      setBooks([]); // clear on error
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when search or filter changes
  useEffect(() => {
    fetchBooks();
  }, [searchTerm, filter]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Library Catalog</h1>
            <p className="text-gray-600 mt-2">Browse our collection of curated titles</p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 md:w-80 px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500 text-sm"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500 text-sm bg-white"
            >
              <option value="all">All Books</option>
              <option value="available">Available Now</option>
            </select>
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        )}

        {/* Real Books Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        {!loading && books.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No books found.</p>
          </div>
        )}
      </div>
    </div>
  );
}