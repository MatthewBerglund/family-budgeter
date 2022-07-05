import { useContext } from 'react';

import Modal from './components/Modal';

import { getExpenseMonth } from '../../utils/helpers';
import { GlobalContext } from '../../store/GlobalState';

const ConfirmMonthModal = ({ changeMonthView, closeConfirmMonthModal }) => {
  const { lastAddedExpense } = useContext(GlobalContext);

  const expenseMonth = getExpenseMonth(lastAddedExpense);

  const modalProps = {
    cancelCallback: () => closeConfirmMonthModal(),
    okCallback: () => {
      closeConfirmMonthModal();
      changeMonthView(expenseMonth);
    },
    modalTitle: `New expense added to ${expenseMonth}`,
    cancelButtonLabel: 'Stay here',
    okButtonLabel: `Open ${expenseMonth}`,
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
