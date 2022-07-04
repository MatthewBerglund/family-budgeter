import { useContext } from 'react';

import Modal from './components/Modal';

import { getUKFormattedDate, getUKFormattedEuros } from '../../utils/helpers';
import { GlobalContext } from '../../store/GlobalState';

const ConfirmDeleteModal = () => {
  const { expenseToDelete, deleteExpense, closeConfirmDeleteModal } = useContext(GlobalContext);

  const { title, amount, date, id } = expenseToDelete;

  const modalProps = {
    cancelCallback: () => closeConfirmDeleteModal(),
    okCallback: () => deleteExpense(id),
    modalTitle: 'Confirm expense deletion',
    cancelButtonLabel: 'Cancel',
    okButtonLabel: 'Delete',
    okButtonColor: 'btn-danger',
  };

  return (
    <Modal {...modalProps}>
      <h6 className="mb-3">Please confirm you want to delete this expense:</h6>
      {expenseToDelete && (
        <dl className="row">
          <dt className="col-3">Date:</dt>
          <dd className="col-9">{getUKFormattedDate(date)}</dd>
          <dt className="col-3">Title:</dt>
          <dd className="col-9">{title}</dd>
          <dt className="col-3">Amount:</dt>
          <dd className="col-9">{getUKFormattedEuros(amount)}</dd>
        </dl>
      )}
    </Modal>
  );
};

export default ConfirmDeleteModal;
