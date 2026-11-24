import { SearchInput, inputClass } from '../common/ui.jsx';
import { useExpense } from '../../hooks/useExpense';

export default function TransactionFilters({ filters, onChange, lockType }) {
  const { categories } = useExpense();
  const set = (field) => (e) => onChange({ ...filters, [field]: e.target.value });
  const options = categories.filter((c) => filters.type === 'all' || c.type === filters.type);
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      <div className="sm:col-span-2">
        <SearchInput value={filters.search} onChange={(search) => onChange({ ...filters, search })} />
      </div>
      {!lockType && (
        <select aria-label="Filter by type" className={inputClass} value={filters.type} onChange={(e) => onChange({ ...filters, type: e.target.value, category: 'all' })}>
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      )}
      <select aria-label="Filter by category" className={inputClass} value={filters.category} onChange={set('category')}>
        <option value="all">All categories</option>
        {options.map((c) => (
          <option key={c.id} value={c.id}>{c.name}{filters.type === 'all' ? ` (${c.type})` : ''}</option>
        ))}
      </select>
      <input aria-label="From date" type="date" className={inputClass} value={filters.from} onChange={set('from')} />
      <input aria-label="To date" type="date" className={inputClass} value={filters.to} onChange={set('to')} />
      <select aria-label="Sort" className={inputClass} value={filters.sort} onChange={set('sort')}>
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="amount-desc">Highest amount</option>
        <option value="amount-asc">Lowest amount</option>
      </select>
    </div>
  );
}
