import { useContext } from 'react';

import { Modal } from './components/Modal';
import { getUKFormattedDate } from '../../utils/helpers';
import { GlobalContext } from '../../GlobalState';

const ConfirmMonthModal = ({ expense }) => {
  const { closeConfirmMonthModal, changeMonthView } = useContext(GlobalContext);

  const expenseMonth = getUKFormattedDate(expense.date, { year: 'numeric', month: 'long' });

  const modalProps = {
    cancelCallback: () => closeConfirmMonthModal(),
    okCallback: () => changeMonthView(expenseMonth),
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
