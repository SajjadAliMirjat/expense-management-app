import { createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { ACTIONS, expenseReducer } from './expenseReducer';
import { defaultCategories } from '../data/defaultCategories';
import { makeDemoTransactions } from '../data/demoTransactions';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { formatCurrency } from '../utils/formatCurrency';

export const ExpenseContext = createContext(null);

function initState() {
  const transactions = loadFromStorage('ema:transactions', null);
  const categories = loadFromStorage('ema:categories', null);
  return {
    transactions: Array.isArray(transactions) ? transactions : makeDemoTransactions(),
    categories: Array.isArray(categories) && categories.length ? categories : defaultCategories,
    currency: loadFromStorage('ema:currency', 'PKR'),
  };
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, undefined, initState);
  const [toasts, setToasts] = useState([]);

  useEffect(() => saveToStorage('ema:transactions', state.transactions), [state.transactions]);
  useEffect(() => saveToStorage('ema:categories', state.categories), [state.categories]);
  useEffect(() => saveToStorage('ema:currency', state.currency), [state.currency]);

  const notify = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const value = useMemo(() => {
    const getCategory = (id) =>
      state.categories.find((c) => c.id === id) ?? { id, name: 'Other', color: '#64748b', icon: 'Tag' };
    return {
      ...state,
      dispatch,
      ACTIONS,
      toasts,
      notify,
      getCategory,
      fmt: (amount) => formatCurrency(amount, state.currency),
    };
  }, [state, toasts, notify]);

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}
