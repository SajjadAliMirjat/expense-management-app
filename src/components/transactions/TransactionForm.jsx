import { useState } from 'react';
import { Button, inputClass } from '../common/ui.jsx';
import { useExpense } from '../../hooks/useExpense';
import { todayISO } from '../../utils/dateUtils';

function Field({ label, error, children }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-xs font-normal text-rose-600">{error}</p>}
    </label>
  );
}

export default function TransactionForm({ initial, defaultType = 'expense', lockType, onSubmit, onCancel }) {
  const { categories } = useExpense();
  const firstCategory = (type) => categories.find((c) => c.type === type)?.id ?? '';
  const [values, setValues] = useState(
    initial
      ? { ...initial, amount: String(initial.amount) }
      : { title: '', amount: '', type: defaultType, category: firstCategory(defaultType), date: todayISO(), description: '' }
  );
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  const setType = (e) => setValues((v) => ({ ...v, type: e.target.value, category: firstCategory(e.target.value) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!values.title.trim()) next.title = 'Enter a title.';
    if (!values.amount || Number(values.amount) <= 0) next.amount = 'Amount must be greater than zero.';
    if (!values.category) next.category = 'Choose a category.';
    if (!values.date) next.date = 'Choose a date.';
    setErrors(next);
    if (Object.keys(next).length) return;
    onSubmit({ ...values, title: values.title.trim(), description: values.description.trim(), amount: Number(values.amount) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Field label="Title" error={errors.title}>
        <input className={inputClass} value={values.title} onChange={set('title')} placeholder="e.g. Grocery shopping" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Amount" error={errors.amount}>
          <input className={inputClass} type="number" min="0" step="0.01" value={values.amount} onChange={set('amount')} />
        </Field>
        <Field label="Type">
          <select className={inputClass} value={values.type} onChange={setType} disabled={!!lockType}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </Field>
        <Field label="Category" error={errors.category}>
          <select className={inputClass} value={values.category} onChange={set('category')}>
            {categories.filter((c) => c.type === values.type).map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Date" error={errors.date}>
          <input className={inputClass} type="date" value={values.date} onChange={set('date')} />
        </Field>
      </div>
      <Field label="Description (optional)">
        <textarea className={`${inputClass} h-20 py-2`} value={values.description} onChange={set('description')} />
      </Field>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
