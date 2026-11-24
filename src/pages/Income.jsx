import TransactionsView from '../components/transactions/TransactionsView.jsx';
import TypeSummary from '../components/transactions/TypeSummary.jsx';

export default function Income() {
  return (
    <>
      <TypeSummary type="income" />
      <TransactionsView fixedType="income" />
    </>
  );
}
