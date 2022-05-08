import { useRef, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from './components/ModalComponents';

const ConfirmMonthModal = ({ monthToShow, setIsOpen, handleCallForAction }) => {
  const callForAction = useRef(null);

  // focus on call for action button on mount
  // blur on unmount
  useEffect(() => {
    callForAction.current?.focus();

    // the ref must be saved into a variable to accomodate react warning
    const elementToClean = callForAction.current;
    return () => {
      elementToClean.blur();
    };
  }, []);

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
          ref={callForAction}
          onClick={handleCallForAction}
        >
          Open {monthToShow}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmMonthModal;
