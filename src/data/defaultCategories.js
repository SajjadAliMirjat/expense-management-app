export const COLORS = ['#f97316', '#8b5cf6', '#0ea5e9', '#ef4444', '#ec4899', '#14b8a6', '#6366f1', '#16a34a', '#eab308', '#64748b'];
export const ICON_NAMES = ['Tag', 'Utensils', 'ShoppingBag', 'Car', 'Receipt', 'Film', 'HeartPulse', 'GraduationCap', 'Briefcase', 'Laptop', 'Building2', 'TrendingUp', 'Coffee', 'Home', 'Plane', 'Gift'];
const c = (id, name, type, color, icon) => ({ id, name, type, color, icon, custom: false });
export const defaultCategories = [
  c('exp-food', 'Food', 'expense', '#f97316', 'Utensils'),
  c('exp-shopping', 'Shopping', 'expense', '#8b5cf6', 'ShoppingBag'),
  c('exp-transport', 'Transport', 'expense', '#0ea5e9', 'Car'),
  c('exp-bills', 'Bills', 'expense', '#ef4444', 'Receipt'),
  c('exp-entertainment', 'Entertainment', 'expense', '#ec4899', 'Film'),
  c('exp-health', 'Health', 'expense', '#14b8a6', 'HeartPulse'),
  c('exp-education', 'Education', 'expense', '#6366f1', 'GraduationCap'),
  c('exp-other', 'Other', 'expense', '#64748b', 'Tag'),
  c('inc-salary', 'Salary', 'income', '#16a34a', 'Briefcase'),
  c('inc-freelance', 'Freelance', 'income', '#0d9488', 'Laptop'),
  c('inc-business', 'Business', 'income', '#65a30d', 'Building2'),
  c('inc-investment', 'Investment', 'income', '#059669', 'TrendingUp'),
  c('inc-other', 'Other', 'income', '#64748b', 'Tag'),
];
export const FALLBACK_CATEGORY = { income: 'inc-other', expense: 'exp-other' };
