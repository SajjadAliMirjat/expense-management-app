import { Link } from 'react-router-dom';
import CategoryIcon from '../common/CategoryIcon.jsx';
import { Card, EmptyState } from '../common/ui.jsx';
import { Amount } from '../transactions/TransactionCard.jsx';
import { useExpense } from '../../hooks/useExpense';
import { formatDate } from '../../utils/dateUtils';

export default function RecentTransactions() {
  const { transactions, getCategory } = useExpense();
  const recent = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
  return (
    <Card title="Recent transactions" action={<Link to="/transactions" className="text-sm font-medium text-emerald-600 hover:underline">View all</Link>}>
      {recent.length ? (
        <ul className="divide-y divide-slate-100">
          {recent.map((t) => (
            <li key={t.id} className="flex items-center gap-3 py-3">
              <CategoryIcon category={getCategory(t.category)} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{t.title}</p>
                <p className="text-xs text-slate-500">{formatDate(t.date)}</p>
              </div>
              <Amount t={t} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title="No transactions yet" />
      )}
    </Card>
  );
}
