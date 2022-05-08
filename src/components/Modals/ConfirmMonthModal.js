import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from './components/ModalComponents';

const ConfirmMonthModal = ({ setIsOpen, monthToShow, handleCallForAction }) => {
  return (
    <Modal modalId="confirmationHistoryView">
      <ModalHeader setIsOpen={setIsOpen}>
        <h5 className="modal-title" id="modalLabel">
          Select month view
        </h5>
      </ModalHeader>
      <ModalBody>
        <h6 className="mb-3">
          Would you like to open the new expense month's history?
        </h6>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setIsOpen(false)}
        >
          Stay here
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCallForAction}
        >
          Open {monthToShow}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmMonthModal;
