import TransactionsView from '../components/transactions/TransactionsView.jsx';
import TypeSummary from '../components/transactions/TypeSummary.jsx';

export default function Expenses() {
  return (
    <>
      <TypeSummary type="expense" />
      <TransactionsView fixedType="expense" />
    </>
  );
}
