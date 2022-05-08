import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from './components/ModalComponents';
import { getUKFormattedDate, getUKFormattedEuros } from '../../utils/helpers';

const ConfirmDeleteModal = ({ expense, setIsOpen, handleCallForAction }) => {
  const { title, amount, date, id } = expense;

  return (
    <Modal modalId={`modal${id}`}>
      <ModalHeader setIsOpen={setIsOpen}>
        <h5 className="modal-title" id="modalLabel">
          Confirm expense deletion
        </h5>
      </ModalHeader>
      <ModalBody>
        <h6 className="mb-3">
          Please confirm you want to delete this expense:
        </h6>
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
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setIsOpen(false)}
        >
          I'm not sure
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleCallForAction(id)}
        >
          Yes delete!!
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmDeleteModal;
