import { useLocalStorage } from './useLocalStorage';
import { isToday, isYesterday, isLast7Days, isThisMonth } from '../lib/dateUtils';

export function useExpenses() {
  const [expenses, setExpenses] = useLocalStorage('money-flow-expenses', []);

  const addExpense = (expense) => {
    // expense shape: { title, amount, date, tags }
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([...expenses, newExpense]);
  };

  const importExpenses = (importedData) => {
    if (Array.isArray(importedData)) {
      setExpenses(importedData);
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // derived stats
  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const todaySpent = expenses.filter(e => isToday(e.date)).reduce((sum, e) => sum + Number(e.amount), 0);
  const yesterdaySpent = expenses.filter(e => isYesterday(e.date)).reduce((sum, e) => sum + Number(e.amount), 0);
  const last7DaysSpent = expenses.filter(e => isLast7Days(e.date)).reduce((sum, e) => sum + Number(e.amount), 0);
  const thisMonthSpent = expenses.filter(e => isThisMonth(e.date)).reduce((sum, e) => sum + Number(e.amount), 0);
  
  const stats = {
    totalSpent,
    todaySpent,
    yesterdaySpent,
    last7DaysSpent,
    thisMonthSpent,
    totalTransactions: expenses.length,
  };

  const allTags = Array.from(new Set(expenses.flatMap((e) => e.tags)));

  return {
    expenses,
    addExpense,
    deleteExpense,
    importExpenses,
    stats,
    allTags,
  };
}
