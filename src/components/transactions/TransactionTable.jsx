import CategoryIcon from '../common/CategoryIcon.jsx';
import TransactionCard, { Amount, RowActions } from './TransactionCard.jsx';
import { useExpense } from '../../hooks/useExpense';
import { formatDate } from '../../utils/dateUtils';

export default function TransactionTable({ transactions, ...actions }) {
  const { getCategory } = useExpense();
  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Transaction</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
              <th className="px-4 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((t) => {
              const cat = getCategory(t.category);
              return (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{t.title}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2"><CategoryIcon category={cat} size={28} />{cat.name}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{formatDate(t.date)}</td>
                  <td className="px-4 py-3 text-right"><Amount t={t} /></td>
                  <td className="px-4 py-3"><RowActions t={t} {...actions} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="space-y-3 md:hidden">
        {transactions.map((t) => <TransactionCard key={t.id} t={t} {...actions} />)}
      </div>
    </>
  );
}
