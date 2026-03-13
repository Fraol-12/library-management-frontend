import { useState, useEffect } from 'react';
import api from '../api/client';
import toast from 'react-hot-toast';

export default function StaffDashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '', description: '' });

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/books/');
      setBooks(res.data.results || res.data);
    } catch (err) {
      setError('Failed to load books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async () => {
    try {
      await api.post('/books/', newBook);
      toast.success('Book added successfully');
      setFormOpen(false);
      setNewBook({ title: '', author: '', isbn: '', description: '' });
      fetchBooks();
    } catch (err) {
      toast.error('Failed to add book');
    }
  };

  const deleteBook = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;

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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Staff Dashboard – Book Management</h1>

        {/* Add Book Form Toggle */}
        <div className="mb-8">
          <button
            onClick={() => setFormOpen(!formOpen)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            {formOpen ? 'Cancel' : '+ Add New Book'}
          </button>
        </div>

        {/* Add Book Form */}
        {formOpen && (
          <div className="bg-white p-8 rounded-2xl shadow mb-10">
            <h2 className="text-2xl font-semibold mb-6">Add New Book</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                className="p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Author"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                className="p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="ISBN"
                value={newBook.isbn}
                onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                className="p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                className="p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2"
              />
            </div>
            <div className="mt-6 flex gap-4">
              <button
                onClick={addBook}
                className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                Save Book
              </button>
              <button
                onClick={() => setFormOpen(false)}
                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Book List */}
        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <h2 className="text-2xl font-semibold p-8 pb-4">All Books</h2>

          {loading ? (
            <div className="p-8 text-center">Loading books...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">
              {error}
              <button
                onClick={fetchBooks}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Retry
              </button>
            </div>
          ) : books.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No books found.</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-6 font-semibold">Title</th>
                  <th className="p-6 font-semibold">Author</th>
                  <th className="p-6 font-semibold">ISBN</th>
                  <th className="p-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-6 font-medium">{book.title}</td>
                    <td className="p-6 text-gray-600">{book.author}</td>
                    <td className="p-6 font-mono text-sm text-gray-600">{book.isbn}</td>
                    <td className="p-6 text-right">
                      <button
                        onClick={() => deleteBook(book.id, book.title)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}