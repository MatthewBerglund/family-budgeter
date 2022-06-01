import { Modal } from './components/Modal';
import { useState } from 'react';
import { getUKFormattedDate, getUKFormattedEuros } from '../../utils/helpers';

const EditExpenseModal = ({ setIsOpen, okCallback, expense }) => {
  const [name, setName] = useState(expense.title);
  const [date, setDate] = useState(expense.date);
  const [amount, setAmount] = useState(expense.amount);

  const modalProps = {
    cancelCallback: () => setIsOpen(false),
    okCallback: () => okCallback(),
    modalTitle: 'Edit expense',
    cancelButtonLabel: 'Cancel',
    okButtonLabel: `Save`,
    okButtonColor: 'btn-primary',
  };

  return (
    <Modal {...modalProps}>
      <div className="container d-grid gap-3 mb-3">
        <div className="row">
          <label className="col-2">Name</label>
          <input type="text" className="col-9" value={name} />
        </div>
        <div className="row">
          <label className="col-2">Date</label>
          <input
            type="text"
            className="col-9"
            value={getUKFormattedDate(date)}
          />
        </div>
        <div className="row">
          <label className="col-2">Amount</label>
          <input
            type="text"
            className="col-9"
            value={getUKFormattedEuros(amount)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditExpenseModal;
