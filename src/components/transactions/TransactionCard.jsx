import { Eye, Pencil, Trash2 } from 'lucide-react';
import CategoryIcon from '../common/CategoryIcon.jsx';
import { useExpense } from '../../hooks/useExpense';
import { formatDate } from '../../utils/dateUtils';

export function Amount({ t }) {
  const { fmt } = useExpense();
  return (
    <span className={`font-semibold tabular-nums ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
      {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
    </span>
  );
}

export function RowActions({ t, onView, onEdit, onDelete }) {
  const btn = 'rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800';
  return (
    <div className="flex justify-end gap-1">
      <button className={btn} aria-label={`View ${t.title}`} onClick={() => onView(t)}><Eye size={16} /></button>
      <button className={btn} aria-label={`Edit ${t.title}`} onClick={() => onEdit(t)}><Pencil size={16} /></button>
      <button className={`${btn} hover:!text-rose-600`} aria-label={`Delete ${t.title}`} onClick={() => onDelete(t)}><Trash2 size={16} /></button>
    </div>
  );
}

export default function TransactionCard({ t, ...actions }) {
  const { getCategory } = useExpense();
  const cat = getCategory(t.category);
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex items-center gap-3">
        <CategoryIcon category={cat} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{t.title}</p>
          <p className="text-xs text-slate-500">{cat.name} · {formatDate(t.date)}</p>
        </div>
        <Amount t={t} />
      </div>
      <div className="mt-2 border-t border-slate-100 pt-1"><RowActions t={t} {...actions} /></div>
    </div>
  );
}
