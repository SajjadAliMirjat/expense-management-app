import { Card, EmptyState } from '../common/ui.jsx';
import CategoryIcon from '../common/CategoryIcon.jsx';
import { useExpense } from '../../hooks/useExpense';
import { byType, getCategoryBreakdown, getMonthly } from '../../utils/analytics';
import { monthKey, todayISO } from '../../utils/dateUtils';

// Shared summary for the Income and Expenses pages.
export default function TypeSummary({ type }) {
  const { transactions, categories, fmt, getCategory } = useExpense();
  const isIncome = type === 'income';
  const list = byType(transactions, type);
  const total = list.reduce((s, t) => s + t.amount, 0);
  const breakdown = getCategoryBreakdown(transactions, type, categories);
  const months = getMonthly(transactions, monthKey(todayISO()), 6).reverse();
  const field = isIncome ? 'income' : 'expenses';
  const color = isIncome ? 'bg-emerald-500' : 'bg-rose-500';
  const max = Math.max(...months.map((x) => x[field]), 1);
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card title={isIncome ? 'Total income' : 'Total expenses'}>
        <p className={`text-3xl font-semibold tabular-nums ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>{fmt(total)}</p>
        <p className="mt-1 text-sm text-slate-500">{list.length} transactions</p>
      </Card>
      <Card title="By category">
        {breakdown.length ? (
          <ul className="space-y-3">
            {breakdown.map((b) => (
              <li key={b.id} className="flex items-center gap-3 text-sm">
                <CategoryIcon category={getCategory(b.id)} size={28} />
                <span className="flex-1">{b.name}</span>
                <span className="font-medium tabular-nums">{fmt(b.value)}</span>
              </li>
            ))}
          </ul>
        ) : <EmptyState title="Nothing here yet" />}
      </Card>
      <Card title="Monthly summary">
        <ul className="space-y-2 text-sm">
          {months.map((m) => (
            <li key={m.key} className="flex items-center gap-3">
              <span className="w-8 text-slate-500">{m.month}</span>
              <span className="h-2 flex-1 rounded-full bg-slate-100"><span className={`block h-2 rounded-full ${color}`} style={{ width: `${(m[field] / max) * 100}%` }} /></span>
              <span className="w-24 text-right tabular-nums">{fmt(m[field])}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
