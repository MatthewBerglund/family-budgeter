import { Modal } from './components/Modal';

import { getUKFormattedDate } from '../../utils/helpers';
import { useGlobalFunctions, useGlobalState } from '../../utils/hooks';

const ConfirmMonthModal = () => {
  const { lastAddedExpense } = useGlobalState();
  const { closeConfirmMonthModal, changeMonthView } = useGlobalFunctions();

  const expenseMonth = getUKFormattedDate(lastAddedExpense.date, { year: 'numeric', month: 'long' });

  const modalProps = {
    cancelCallback: () => closeConfirmMonthModal(),
    okCallback: () => {
      changeMonthView(expenseMonth);
      closeConfirmMonthModal();
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
