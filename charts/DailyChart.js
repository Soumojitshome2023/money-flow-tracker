import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function DailyChart({ expenses }) {
  // grouping expenses by date
  const dataMap = expenses.reduce((acc, exp) => {
    const date = new Date(exp.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    acc[date] = (acc[date] || 0) + exp.amount;
    return acc;
  }, {});

  const data = Object.keys(dataMap).map(date => ({ date, amount: dataMap[date] })).slice(-14);

  if (data.length === 0) {
    return <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl border border-gray-100">No daily data available</div>;
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col h-72">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Daily Spending (Last 14 Days)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={(val) => `₹${val}`} />
          <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value) => [`₹${value}`, 'Amount']} />
          <Bar dataKey="amount" fill="#000000" radius={[4, 4, 0, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
