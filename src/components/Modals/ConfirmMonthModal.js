import { Modal } from './components/Modal';

const ConfirmMonthModal = ({ monthToShow, setIsOpen, okCallback }) => {
  const modalProps = {
    cancelCallback: () => setIsOpen(false),
    okCallback: () => okCallback(monthToShow),
    modalTitle: 'Select month view',
    cancelButtonLabel: 'Stay here',
    okButtonLabel: `Open ${monthToShow}`,
    okButtonColor: 'btn-primary',
  };

  return (
    <Modal {...modalProps}>
      <h6 className="mb-3">
        Would you like to open the new expense month's history?
      </h6>
    </Modal>
  );
};

export default ConfirmMonthModal;
