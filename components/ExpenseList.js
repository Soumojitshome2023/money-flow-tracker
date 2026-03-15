import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
        <p className="text-gray-500">No expenses found for this period.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {expenses.sort((a,b) => new Date(b.date) - new Date(a.date)).map(expense => (
        <ExpenseItem 
          key={expense.id} 
          expense={expense} 
          onDelete={onDeleteExpense} 
        />
      ))}
    </div>
  );
}
