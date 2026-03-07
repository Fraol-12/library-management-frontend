// src/components/book/BookCard.jsx
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  const isAvailable = book.is_available || book.available; // handle both field names

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100">
      {/* Book Cover */}
      <div className="h-64 bg-gray-200 relative">
        {book.cover_image ? (
          <img 
            src={book.cover_image} 
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
            <span className="text-6xl">📖</span>
          </div>
        )}

        {/* Availability Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
          isAvailable 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {isAvailable ? 'Available' : 'Out of Stock'}
        </div>
      </div>

      {/* Book Info */}
      <div className="p-5">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 mb-1">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {book.author}
        </p>

        <div className="flex items-center justify-between">
          <Link 
            to={`/books/${book.id}`}
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
          >
            View Details →
          </Link>

          {isAvailable && (
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
            >
              Borrow
            </button>
          )}
        </div>
      </div>
    </div>
  );
}