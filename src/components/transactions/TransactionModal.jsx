import { Modal } from '../common/ui.jsx';
import TransactionForm from './TransactionForm.jsx';
import { useExpense } from '../../hooks/useExpense';
import { newId } from '../../utils/storage';

// Handles both adding (no `transaction`) and editing.
export default function TransactionModal({ transaction, defaultType, lockType, onClose }) {
  const { dispatch, ACTIONS, notify } = useExpense();
  const handleSubmit = (data) => {
    if (transaction) {
      dispatch({ type: ACTIONS.UPDATE_TRANSACTION, payload: { ...transaction, ...data } });
      notify('Transaction updated');
    } else {
      dispatch({ type: ACTIONS.ADD_TRANSACTION, payload: { ...data, id: newId() } });
      notify('Transaction added');
    }
    onClose();
  };
  return (
    <Modal title={transaction ? 'Edit transaction' : 'Add transaction'} onClose={onClose}>
      <TransactionForm initial={transaction} defaultType={defaultType} lockType={lockType} onSubmit={handleSubmit} onCancel={onClose} />
    </Modal>
  );
}
