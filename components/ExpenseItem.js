import { Trash2 } from 'lucide-react';
import { formatDate } from '../lib/dateUtils';

export default function ExpenseItem({ expense, onDelete }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm mb-3 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-gray-800">{expense.title}</h3>
        <span className="text-xs text-gray-500">{formatDate(expense.date)}</span>
        {expense.tags && expense.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {expense.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-lg">₹{expense.amount.toFixed(2)}</span>
        <button
          onClick={() => onDelete(expense.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
          title="Delete expense"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
