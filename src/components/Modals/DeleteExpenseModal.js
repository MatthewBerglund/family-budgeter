import { useState, forwardRef, useImperativeHandle } from 'react';

import Modal from './components/Modal';

const DeleteExpenseModal = forwardRef(({ showAlert }, ref) => {
  const [expense, setExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);

  let title = '';
  let date = '';
  let amount = '';

  useImperativeHandle(ref, () => ({
    show: expense => {
      setExpense(expense);
      setShowModal(true);
    },
  }));

  if (expense) {
    title = expense.title;
    date = expense.formattedDate;
    amount = expense.getFormattedAmount('en-GB', 'EUR');
  }

  const handleDelete = async () => {
    setShowModal(false);
    try {
      await expense.delete();
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
