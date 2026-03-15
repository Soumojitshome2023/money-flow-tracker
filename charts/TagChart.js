import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#000000', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6B7280'];

export default function TagChart({ expenses }) {
  const dataMap = expenses.reduce((acc, exp) => {
    const tags = exp.tags && exp.tags.length > 0 ? exp.tags : ['untagged'];
    tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + (exp.amount / tags.length);
    });
    return acc;
  }, {});

  const data = Object.keys(dataMap)
    .map(tag => ({ name: tag, value: dataMap[tag] }))
    .sort((a,b) => b.value - a.value)
    .slice(0, 8); // Top 8 tags

  if (data.length === 0) {
    return <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl border border-gray-100">No tag data available</div>;
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col h-72">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Top Spending by Tag</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `₹${value.toFixed(2)}`}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
