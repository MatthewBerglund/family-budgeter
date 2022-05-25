import { Modal } from './components/Modal';

const ConfirmMonthModal = ({ newExpenseMonth, setIsOpen, okCallback }) => {
  const modalProps = {
    cancelCallback: () => setIsOpen(false),
    okCallback: () => okCallback(newExpenseMonth),
    modalTitle: 'New expense added',
    cancelButtonLabel: 'Stay here',
    okButtonLabel: `Open ${newExpenseMonth}`,
    okButtonColor: 'btn-primary',
  };

  return (
    <Modal {...modalProps}>
      <h6 className="mb-3">
        Your expense has been added. Would you like to switch to the month for
        this expense?
      </h6>
    </Modal>
  );
};

export default ConfirmMonthModal;
