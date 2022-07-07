import { useContext, useState, forwardRef, useImperativeHandle } from 'react';

import Modal from './components/Modal';

import { getUKFormattedDate, getUKFormattedEuros } from '../../utils/helpers';
import { GlobalContext } from '../../store/GlobalState';

const DeleteExpenseModal = forwardRef((props, ref) => {
  const [expense, setExpense] = useState({});
  const [showModal, setShowModal] = useState(false);

  const { deleteExpense } = useContext(GlobalContext);
  const { showAlert } = props;

  useImperativeHandle(ref, () => ({
    show: expense => {
      setExpense(expense);
      setShowModal(true);
    },
  }));

  const title = expense.title || '';
  const date = expense.date ? getUKFormattedDate(expense.date) : '';
  const amount = expense.amount ? getUKFormattedEuros(expense.amount) : '';

  const handleDelete = async (id) => {
    setShowModal(false);
    try {
      await deleteExpense(id);
      showAlert('success', 'Expense deleted', `The expense "${title}" totaling ${amount} from ${date} has been deleted.`);
    } catch (err) {
      console.log(err);
      showAlert('danger', 'Failed to delete expense', 'The expense could not be deleted. Please try again.');
    }
  };

  const modalProps = {
    cancelCallback: () => setShowModal(false),
    okCallback: () => handleDelete(expense.id),
    modalTitle: 'Confirm expense deletion',
    cancelButtonLabel: 'Cancel',
    okButtonLabel: 'Delete',
    okButtonColor: 'btn-danger',
  };

  return (
    showModal && (
      <Modal {...modalProps}>
        <h6 className="mb-3">
          Please confirm you want to delete this expense:
        </h6>
        {expense && (
          <dl className="row">
            <dt className="col-3">Date:</dt>
            <dd className="col-9">{date}</dd>
            <dt className="col-3">Title:</dt>
            <dd className="col-9">{title}</dd>
            <dt className="col-3">Amount:</dt>
            <dd className="col-9">{amount}</dd>
          </dl>
        )}
      </Modal>
    )
  );
});

export default DeleteExpenseModal;
