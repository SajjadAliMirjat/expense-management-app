import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button, ConfirmDialog, EmptyState, Modal } from '../common/ui.jsx';
import TransactionFilters from './TransactionFilters.jsx';
import TransactionTable from './TransactionTable.jsx';
import TransactionModal from './TransactionModal.jsx';
import { Amount } from './TransactionCard.jsx';
import { useExpense } from '../../hooks/useExpense';
import { formatDate } from '../../utils/dateUtils';

export default function TransactionsView({ fixedType }) {
  const { transactions, getCategory, dispatch, ACTIONS, notify } = useExpense();
  const [filters, setFilters] = useState({ search: '', type: fixedType ?? 'all', category: 'all', from: '', to: '', sort: 'date-desc' });
  const [modal, setModal] = useState(null); // { mode: 'add' | 'edit' | 'view' | 'delete', t }

  const visible = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    const list = transactions.filter((t) => {
      if (filters.type !== 'all' && t.type !== filters.type) return false;
      if (filters.category !== 'all' && t.category !== filters.category) return false;
      if (filters.from && t.date < filters.from) return false;
      if (filters.to && t.date > filters.to) return false;
      if (q && !`${t.title} ${t.description} ${getCategory(t.category).name}`.toLowerCase().includes(q)) return false;
      return true;
    });
    const [field, dir] = filters.sort.split('-');
    const sign = dir === 'asc' ? 1 : -1;
    return list.sort((a, b) => sign * (field === 'date' ? a.date.localeCompare(b.date) : a.amount - b.amount));
  }, [transactions, filters, getCategory]);

  const close = () => setModal(null);
  const actions = {
    onView: (t) => setModal({ mode: 'view', t }),
    onEdit: (t) => setModal({ mode: 'edit', t }),
    onDelete: (t) => setModal({ mode: 'delete', t }),
  };
  const confirmDelete = () => {
    dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: modal.t.id });
    notify('Transaction deleted');
    close();
  };
  const addButton = (
    <Button onClick={() => setModal({ mode: 'add' })}><Plus size={16} /> Add {fixedType ?? 'transaction'}</Button>
  );

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">{visible.length} {visible.length === 1 ? 'transaction' : 'transactions'}</p>
        {addButton}
      </div>
      <TransactionFilters filters={filters} onChange={setFilters} lockType={!!fixedType} />
      {visible.length ? (
        <TransactionTable transactions={visible} {...actions} />
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white">
          <EmptyState title="No transactions found" text="Try different filters, or add a new transaction." action={addButton} />
        </div>
      )}

      {(modal?.mode === 'add' || modal?.mode === 'edit') && (
        <TransactionModal transaction={modal.t} defaultType={fixedType ?? 'expense'} lockType={!!fixedType} onClose={close} />
      )}
      {modal?.mode === 'delete' && (
        <ConfirmDialog title="Delete transaction" message={`Delete "${modal.t.title}"? This cannot be undone.`} onConfirm={confirmDelete} onCancel={close} />
      )}
      {modal?.mode === 'view' && (
        <Modal title="Transaction details" onClose={close}>
          <dl className="space-y-3 text-sm">
            {[
              ['Title', modal.t.title],
              ['Type', modal.t.type === 'income' ? 'Income' : 'Expense'],
              ['Category', getCategory(modal.t.category).name],
              ['Date', formatDate(modal.t.date)],
              ['Description', modal.t.description || '—'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4"><dt className="text-slate-500">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
            ))}
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Amount</dt><dd><Amount t={modal.t} /></dd></div>
          </dl>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setModal({ mode: 'edit', t: modal.t })}>Edit</Button>
            <Button onClick={close}>Close</Button>
          </div>
        </Modal>
      )}
    </section>
  );
}
