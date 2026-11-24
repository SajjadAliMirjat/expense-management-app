import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { EmptyState } from '../common/ui.jsx';
import { useExpense } from '../../hooks/useExpense';
import { formatCompact } from '../../utils/formatCurrency';

const hasData = (data) => data.some((d) => d.income > 0 || d.expenses > 0);
const empty = <EmptyState title="No data yet" text="Add a transaction to see this chart." />;

export function IncomeExpenseChart({ data }) {
  const { fmt } = useExpense();
  if (!hasData(data)) return empty;
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis tickFormatter={formatCompact} tickLine={false} axisLine={false} fontSize={12} width={45} />
          <Tooltip formatter={(v) => fmt(v)} />
          <Bar dataKey="income" name="Income" fill="#16a34a" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SpendingTrendChart({ data }) {
  const { fmt } = useExpense();
  if (!hasData(data)) return empty;
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis tickFormatter={formatCompact} tickLine={false} axisLine={false} fontSize={12} width={45} />
          <Tooltip formatter={(v) => fmt(v)} />
          <Line type="monotone" dataKey="expenses" name="Spending" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
