import { useState } from 'react';
import { Button, Card, ConfirmDialog, inputClass } from '../components/common/ui.jsx';
import { CURRENCIES } from '../utils/formatCurrency';
import { useExpense } from '../hooks/useExpense';

export default function Settings() {
  const { currency, fmt, dispatch, ACTIONS, notify } = useExpense();
  const [confirm, setConfirm] = useState(null); // 'reset' | 'clear'
  const run = () => {
    if (confirm === 'reset') {
      dispatch({ type: ACTIONS.RESET_DEMO });
      notify('Demo data restored');
    } else {
      dispatch({ type: ACTIONS.CLEAR_TRANSACTIONS });
      notify('All transactions cleared');
    }
    setConfirm(null);
  };
  return (
    <div className="max-w-2xl space-y-6">
      <Card title="Currency">
        <label className="block text-sm text-slate-600">
          Display currency
          <select className={`${inputClass} mt-1 max-w-xs`} value={currency} onChange={(e) => { dispatch({ type: ACTIONS.SET_CURRENCY, payload: e.target.value }); notify(`Currency set to ${e.target.value}`); }}>
            {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <p className="mt-2 text-sm text-slate-500">Preview: {fmt(125000)}. Amounts are formatted only; no conversion is applied.</p>
      </Card>
      <Card title="Data">
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => setConfirm('reset')}>Reset demo data</Button>
          <Button variant="danger" onClick={() => setConfirm('clear')}>Clear all transactions</Button>
        </div>
      </Card>
      {confirm && (
        <ConfirmDialog
          title={confirm === 'reset' ? 'Reset demo data' : 'Clear all transactions'}
          message={confirm === 'reset' ? 'This replaces your transactions and categories with the demo data.' : 'This permanently deletes every transaction. Categories are kept.'}
          confirmLabel={confirm === 'reset' ? 'Reset' : 'Clear all'}
          onConfirm={run}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}
