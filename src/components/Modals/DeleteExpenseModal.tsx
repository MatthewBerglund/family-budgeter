import React, { useState, forwardRef, useImperativeHandle } from 'react';

import Modal from './components/Modal';
import { Expense } from '../../expense';

interface Props {
  showAlert: (type: string, title: string, message: string) => void
}

interface Handle {
  show: (expense: Expense) => void,
}

const DeleteExpenseModal: React.ForwardRefRenderFunction<Handle, Props> = ({ showAlert }, ref) => {
  const [expense, setExpense] = useState<Expense | null>(null);
  const [showModal, setShowModal] = useState(false);

  const title = expense?.title;
  const date = expense?.getFormattedDate('en-GB');
  const amount = expense?.getFormattedAmount('en-GB', 'EUR');

  useImperativeHandle(ref, () => ({
    show: expense => {
      setExpense(expense);
      setShowModal(true);
    }
  }));

  const handleDelete = async () => {
    setShowModal(false);
    try {
      await expense?.delete();
      showAlert('success', 'Expense deleted', `The expense "${title}" totaling ${amount} from ${date} has been deleted.`);
    } catch (err) {
      console.log(err);
      showAlert('danger', 'Failed to delete expense', 'The expense could not be deleted. Please try again.');
    }
  };

  const modalProps = {
    cancelCallback: () => setShowModal(false),
    okCallback: () => handleDelete(),
    modalTitle: 'Confirm expense deletion',
    cancelButtonLabel: 'Cancel',
    okButtonLabel: 'Delete',
    okButtonColor: 'btn-danger',
  };

  return (
    showModal ? (
      <Modal {...modalProps}>
        <h6 className="mb-3">
          Please confirm you want to delete this expense:
        </h6>
        {expense && (
          <dl className="row">
            <dt className="col-3">Date:</dt>
            <dd className="col-9">{expense?.getFormattedDate('en-GB')}</dd>
            <dt className="col-3">Title:</dt>
            <dd className="col-9">{expense?.title}</dd>
            <dt className="col-3">Amount:</dt>
            <dd className="col-9">{expense?.getFormattedAmount('en-GB', 'EUR')}</dd>
          </dl>
        )}
      </Modal>
    ) : null
  );
};

export default forwardRef(DeleteExpenseModal);
