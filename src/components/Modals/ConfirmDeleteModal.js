import { Modal } from './components/Modal';
import { getUKFormattedDate, getUKFormattedEuros } from '../../utils/helpers';

const ConfirmDeleteModal = ({ expense, setIsOpen, okCallback }) => {
  const { title, amount, date, id } = expense;

  const modalProps = {
    cancelCallback: () => setIsOpen(false),
    okCallback: () => okCallback(id),
    modalTitle: 'Confirm expense deletion',
    cancelButtonLabel: "I'm not sure",
    okButtonLabel: 'Yes delete!!',
    okButtonColor: 'btn-danger',
  };

  return (
    <Modal {...modalProps}>
      <h6 className="mb-3">Please confirm you want to delete this expense:</h6>
      {expense && (
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
