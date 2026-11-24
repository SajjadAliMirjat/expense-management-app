import { FALLBACK_CATEGORY, defaultCategories } from '../data/defaultCategories';
import { makeDemoTransactions } from '../data/demoTransactions';

export const ACTIONS = {
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  ADD_CATEGORY: 'ADD_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY',
  SET_CURRENCY: 'SET_CURRENCY',
  RESET_DEMO: 'RESET_DEMO',
  CLEAR_TRANSACTIONS: 'CLEAR_TRANSACTIONS',
};

export function expenseReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TRANSACTION:
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case ACTIONS.UPDATE_TRANSACTION:
      return { ...state, transactions: state.transactions.map((t) => (t.id === action.payload.id ? action.payload : t)) };
    case ACTIONS.DELETE_TRANSACTION:
      return { ...state, transactions: state.transactions.filter((t) => t.id !== action.payload) };
    case ACTIONS.ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };
    case ACTIONS.DELETE_CATEGORY: {
      const target = state.categories.find((c) => c.id === action.payload);
      if (!target || !target.custom) return state;
      // Safe handling: move affected transactions to the "Other" category of the same type.
      const fallback = FALLBACK_CATEGORY[target.type];
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== target.id),
        transactions: state.transactions.map((t) => (t.category === target.id ? { ...t, category: fallback } : t)),
      };
    }
    case ACTIONS.SET_CURRENCY:
      return { ...state, currency: action.payload };
    case ACTIONS.RESET_DEMO:
      return { ...state, transactions: makeDemoTransactions(), categories: defaultCategories };
    case ACTIONS.CLEAR_TRANSACTIONS:
      return { ...state, transactions: [] };
    default:
      return state;
  }
}
