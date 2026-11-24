import { useMemo, useState } from 'react';
import { PiggyBank, Plus, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import SummaryCard from '../components/dashboard/SummaryCard.jsx';
import RecentTransactions from '../components/dashboard/RecentTransactions.jsx';
import { IncomeExpenseChart, SpendingTrendChart } from '../components/dashboard/MonthlyChart.jsx';
import CategoryChart from '../components/dashboard/CategoryChart.jsx';
import TransactionModal from '../components/transactions/TransactionModal.jsx';
import { Button, Card, inputClass } from '../components/common/ui.jsx';
import { useExpense } from '../hooks/useExpense';
import { getCategoryBreakdown, getMonthSummary, getMonthly, getTotals } from '../utils/analytics';
import { monthKey, todayISO } from '../utils/dateUtils';

export default function Dashboard() {
  const { transactions, categories, fmt } = useExpense();
  const [month, setMonth] = useState(monthKey(todayISO()));
  const [adding, setAdding] = useState(false);

  const totals = useMemo(() => getTotals(transactions), [transactions]);
  const summary = useMemo(() => getMonthSummary(transactions, month, categories), [transactions, month, categories]);
  const monthly = useMemo(() => getMonthly(transactions, month), [transactions, month]);
  const breakdown = useMemo(
    () => getCategoryBreakdown(transactions.filter((t) => monthKey(t.date) === month), 'expense', categories),
    [transactions, month, categories]
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          Month
          <input type="month" value={month} onChange={(e) => e.target.value && setMonth(e.target.value)} className={`${inputClass} w-auto`} />
        </label>
        <Button onClick={() => setAdding(true)}><Plus size={16} /> Quick add transaction</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total balance" value={fmt(totals.balance)} icon={Wallet} tone="slate" valueClass={totals.balance < 0 ? 'text-rose-600' : ''} hint="All time" />
        <SummaryCard label="Total income" value={fmt(totals.income)} icon={TrendingUp} tone="green" valueClass="text-emerald-600" hint="All time" />
        <SummaryCard label="Total expenses" value={fmt(totals.expenses)} icon={TrendingDown} tone="red" valueClass="text-rose-600" hint="All time" />
        <SummaryCard label="Savings" value={fmt(summary.savings)} icon={PiggyBank} tone="green" valueClass={summary.savings < 0 ? 'text-rose-600' : 'text-emerald-600'} hint="Selected month" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Income vs expenses (6 months)"><IncomeExpenseChart data={monthly} /></Card>
        <Card title="Spending trend"><SpendingTrendChart data={monthly} /></Card>
        <Card title="Expense categories"><CategoryChart data={breakdown} /></Card>
        <Card title="Monthly summary">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-slate-500">Income</dt><dd className="font-semibold text-emerald-600">{fmt(summary.income)}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Expenses</dt><dd className="font-semibold text-rose-600">{fmt(summary.expenses)}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Savings</dt><dd className="font-semibold">{fmt(summary.savings)}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Savings rate</dt><dd className="font-semibold">{summary.rate.toFixed(1)}%</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Top spending category</dt><dd className="font-semibold">{summary.topCategory ? `${summary.topCategory.name} (${fmt(summary.topCategory.value)})` : '—'}</dd></div>
          </dl>
        </Card>
      </div>
      <RecentTransactions />
      {adding && <TransactionModal onClose={() => setAdding(false)} />}
    </>
  );
}
