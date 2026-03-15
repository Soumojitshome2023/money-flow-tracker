export default function StatsCards({ stats }) {
  const cards = [
    { label: 'Total Spent', value: stats.totalSpent },
    { label: 'Today', value: stats.todaySpent },
    { label: 'Yesterday', value: stats.yesterdaySpent },
    { label: 'Last 7 Days', value: stats.last7DaysSpent },
    { label: 'This Month', value: stats.thisMonthSpent },
    { label: 'Transactions', value: stats.totalTransactions, isCount: true },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-gray-500 font-medium mb-1">{card.label}</span>
          <span className="text-xl font-bold text-gray-900">
            {!card.isCount && '₹'}{card.isCount ? card.value : card.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      ))}
    </div>
  );
}
