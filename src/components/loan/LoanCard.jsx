// src/components/loan/LoanCard.jsx
import { useState } from 'react';
import api from '../../api/client';
import toast from 'react-hot-toast';

export default function LoanCard({ loan, onReturnSuccess }) {
  const [isReturning, setIsReturning] = useState(false);

  const isOverdue = loan.is_overdue;

  const handleReturn = async () => {
    setIsReturning(true);

    try {
      await api.patch(`/loans/${loan.id}/return/`);
      toast.success('Book returned successfully!');
      onReturnSuccess?.(); // refresh dashboard
    } catch (err) {
      // Error already handled by interceptor
    } finally {
      setIsReturning(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all">
      <div className="flex gap-5">
        {/* Book Cover */}
        <div className="w-20 h-28 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
          {loan.book.cover_image ? (
            <img src={loan.book.cover_image} alt={loan.book.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-4xl">
              📖
            </div>
          )}
        </div>

        {/* Loan Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg leading-tight mb-1 line-clamp-2">
            {loan.book.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            by {loan.book.author}
          </p>

          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-gray-500">Borrowed:</span>{' '}
              <span className="font-medium">{new Date(loan.borrowed_at).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-gray-500">Due:</span>{' '}
              <span className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                {new Date(loan.due_date).toLocaleDateString()}
              </span>
            </div>
          </div>

          {isOverdue && (
            <div className="mt-3 inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-medium px-4 py-1 rounded-full">
              Overdue by {Math.ceil((new Date() - new Date(loan.due_date)) / (1000 * 3600 * 24))} days
            </div>
          )}
        </div>

        {/* Return Button */}
        <div className="flex flex-col justify-center">
          <button
            onClick={handleReturn}
            disabled={isReturning || loan.returned_at}
            className={`px-8 py-3 text-sm font-semibold rounded-2xl transition-all ${
              loan.returned_at 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700 text-white active:scale-95'
            }`}
          >
            {isReturning ? 'Returning...' : loan.returned_at ? 'Returned' : 'Return Book'}
          </button>
        </div>
      </div>
    </div>
  );
}