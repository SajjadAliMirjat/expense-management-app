import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import CategoryIcon from '../components/common/CategoryIcon.jsx';
import { Button, Card, ConfirmDialog, inputClass } from '../components/common/ui.jsx';
import { COLORS, ICON_NAMES } from '../data/defaultCategories';
import { useExpense } from '../hooks/useExpense';
import { newId } from '../utils/storage';

export default function Categories() {
  const { categories, transactions, dispatch, ACTIONS, notify } = useExpense();
  const [form, setForm] = useState({ name: '', type: 'expense', color: COLORS[0], icon: 'Tag' });
  const [error, setError] = useState('');
  const [toDelete, setToDelete] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return setError('Enter a category name.');
    if (categories.some((c) => c.type === form.type && c.name.toLowerCase() === name.toLowerCase())) return setError('That category already exists.');
    dispatch({ type: ACTIONS.ADD_CATEGORY, payload: { ...form, name, id: newId(), custom: true } });
    notify('Category added');
    setForm({ ...form, name: '' });
    setError('');
  };
  const usedBy = (id) => transactions.filter((t) => t.category === id).length;
  const confirmDelete = () => {
    dispatch({ type: ACTIONS.DELETE_CATEGORY, payload: toDelete.id });
    notify('Category deleted');
    setToDelete(null);
  };

  return (
    <>
      <Card title="Add custom category">
        <form onSubmit={handleAdd} className="space-y-4" noValidate>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <input aria-label="Category name" className={inputClass} placeholder="Category name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
            </div>
            <select aria-label="Category type" className={inputClass} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <select aria-label="Category icon" className={inputClass} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}>
              {ICON_NAMES.map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Category color">
            {COLORS.map((c) => (
              <button type="button" key={c} role="radio" aria-checked={form.color === c} aria-label={c} onClick={() => setForm({ ...form, color: c })}
                className={`h-8 w-8 rounded-full ring-offset-2 ${form.color === c ? 'ring-2 ring-slate-800' : ''}`} style={{ backgroundColor: c }} />
            ))}
            <Button type="submit" className="ml-auto"><Plus size={16} /> Add category</Button>
          </div>
        </form>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {['expense', 'income'].map((type) => (
          <Card key={type} title={type === 'expense' ? 'Expense categories' : 'Income categories'}>
            <ul className="divide-y divide-slate-100">
              {categories.filter((c) => c.type === type).map((c) => (
                <li key={c.id} className="flex items-center gap-3 py-3">
                  <CategoryIcon category={c} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-slate-500">{usedBy(c.id)} transactions{c.custom ? '' : ' · default'}</p>
                  </div>
                  {c.custom && (
                    <button aria-label={`Delete ${c.name}`} onClick={() => setToDelete(c)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-rose-600"><Trash2 size={16} /></button>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      {toDelete && (
        <ConfirmDialog
          title="Delete category"
          message={usedBy(toDelete.id) ? `"${toDelete.name}" is used by ${usedBy(toDelete.id)} transaction(s). They will be moved to "Other".` : `Delete "${toDelete.name}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </>
  );
}
