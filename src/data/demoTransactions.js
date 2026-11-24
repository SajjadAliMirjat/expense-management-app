import { shiftMonth, todayISO } from '../utils/dateUtils';

// [monthsAgo, day, title, amount, type, categoryId, description]
const rows = [
  [0, 1, 'Monthly Salary', 185000, 'income', 'inc-salary', 'Salary credited'],
  [0, 4, 'Grocery Shopping', 12500, 'expense', 'exp-food', 'Weekly groceries'],
  [0, 6, 'Electricity Bill', 9800, 'expense', 'exp-bills', ''],
  [0, 9, 'Freelance Website Project', 60000, 'income', 'inc-freelance', 'Landing page for a client'],
  [0, 12, 'Uber Rides', 3200, 'expense', 'exp-transport', ''],
  [1, 1, 'Monthly Salary', 185000, 'income', 'inc-salary', 'Salary credited'],
  [1, 3, 'Internet Bill', 4500, 'expense', 'exp-bills', ''],
  [1, 8, 'New Sneakers', 14000, 'expense', 'exp-shopping', ''],
  [1, 12, 'Dinner with Friends', 6500, 'expense', 'exp-food', ''],
  [1, 18, 'Dividend Payout', 15000, 'income', 'inc-investment', 'Quarterly dividend'],
  [1, 22, 'Online Course', 8000, 'expense', 'exp-education', 'React advanced course'],
  [2, 1, 'Monthly Salary', 185000, 'income', 'inc-salary', 'Salary credited'],
  [2, 7, 'Doctor Visit', 5000, 'expense', 'exp-health', ''],
  [2, 15, 'Movie Night', 3500, 'expense', 'exp-entertainment', ''],
  [2, 20, 'Fuel', 7500, 'expense', 'exp-transport', ''],
];

export function makeDemoTransactions() {
  const today = todayISO();
  const thisMonth = today.slice(0, 7);
  return rows.map(([ago, day, title, amount, type, category, description], i) => {
    const key = shiftMonth(thisMonth, -ago);
    const safeDay = ago === 0 ? Math.min(day, Number(today.slice(8))) : day;
    return { id: `demo-${i + 1}`, title, amount, type, category, description, date: `${key}-${String(safeDay).padStart(2, '0')}` };
  });
}
