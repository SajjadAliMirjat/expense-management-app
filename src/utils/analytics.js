import { monthKey, monthLabel, shiftMonth } from './dateUtils';

const sum = (list) => list.reduce((total, t) => total + t.amount, 0);
export const byType = (list, type) => list.filter((t) => t.type === type);

export function getTotals(list) {
  const income = sum(byType(list, 'income'));
  const expenses = sum(byType(list, 'expense'));
  return { income, expenses, balance: income - expenses };
}

export function getMonthly(list, endKey, count = 6) {
  return Array.from({ length: count }, (_, i) => {
    const key = shiftMonth(endKey, i - count + 1);
    const { income, expenses } = getTotals(list.filter((t) => monthKey(t.date) === key));
    return { key, month: monthLabel(key), income, expenses };
  });
}

export function getCategoryBreakdown(list, type, categories) {
  const totals = {};
  byType(list, type).forEach((t) => {
    totals[t.category] = (totals[t.category] || 0) + t.amount;
  });
  return Object.entries(totals)
    .map(([id, value]) => {
      const cat = categories.find((c) => c.id === id);
      return { id, name: cat?.name ?? 'Other', color: cat?.color ?? '#94a3b8', value };
    })
    .sort((a, b) => b.value - a.value);
}

export function getMonthSummary(list, key, categories) {
  const monthList = list.filter((t) => monthKey(t.date) === key);
  const { income, expenses } = getTotals(monthList);
  const savings = income - expenses;
  return {
    income,
    expenses,
    savings,
    rate: income > 0 ? (savings / income) * 100 : 0,
    topCategory: getCategoryBreakdown(monthList, 'expense', categories)[0] ?? null,
  };
}
