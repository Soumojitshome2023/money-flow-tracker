export default function FilterTabs({ activeFilter, setActiveFilter }) {
  const filters = ['Today', 'Yesterday', 'Last 7 Days', 'This Month', 'All Time'];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter
              ? 'bg-black text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
