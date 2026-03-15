"use client";

import { useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';
import StatsCards from '../components/StatsCards';
import FilterTabs from '../components/FilterTabs';
import DailyChart from '../charts/DailyChart';
import MonthlyChart from '../charts/MonthlyChart';
import TagChart from '../charts/TagChart';
import { isToday, isYesterday, isLast7Days, isThisMonth } from '../lib/dateUtils';

export default function Dashboard() {
  const { expenses, addExpense, deleteExpense, importExpenses, stats, allTags } = useExpenses();
  const [activeFilter, setActiveFilter] = useState('This Month');

  const handleExport = () => {
    const dataStr = JSON.stringify(expenses, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `money-flow-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (Array.isArray(json)) {
          importExpenses(json);
          alert('Data imported successfully!');
        } else {
          alert('Invalid JSON format. Expected an array of expenses.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input so same file can be imported again if needed
  };

  const filteredExpenses = expenses.filter(expense => {
    switch (activeFilter) {
      case 'Today': return isToday(expense.date);
      case 'Yesterday': return isYesterday(expense.date);
      case 'Last 7 Days': return isLast7Days(expense.date);
      case 'This Month': return isThisMonth(expense.date);
      case 'All Time': default: return true;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-12 font-sans selection:bg-blue-100 selection:text-blue-900">
      <header className="bg-white border-b border-gray-200 py-4 px-6 md:px-8 mb-8 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <span className="bg-black text-white px-2 py-1 rounded-lg text-lg leading-none shadow-sm">₹</span>
            Money Flow
          </h1>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {stats.totalTransactions} Transactions
            </div>
            
            <button 
              onClick={handleExport}
              className="text-sm font-medium text-gray-700 bg-white border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
            >
              Export
            </button>
            <label className="cursor-pointer text-sm font-medium text-white bg-black px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors">
              Import
              <input 
                type="file" 
                accept=".json" 
                onChange={handleImport} 
                className="hidden" 
              />
            </label>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-6">
        <StatsCards stats={stats} />
        
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-6">
            <AddExpenseForm onAddExpense={addExpense} allTags={allTags} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DailyChart expenses={expenses} />
              <TagChart expenses={expenses} />
            </div>
            
            <MonthlyChart expenses={expenses} />
          </div>

          <div className="w-full xl:w-[480px] bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-fit sticky top-[88px]">
            <div className="flex flex-col gap-5 mb-6">
              <h2 className="text-xl font-bold text-gray-800">History</h2>
              <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            </div>
            <ExpenseList expenses={filteredExpenses} onDeleteExpense={deleteExpense} />
          </div>
        </div>
      </main>

      <footer className="mt-12 pb-6 text-center text-sm text-gray-500">
        Designed by <a href="https://soumojitshome.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900 transition-colors">Soumojit Shome</a>
      </footer>
    </div>
  );
}
