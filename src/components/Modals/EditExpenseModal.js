import DatePicker from 'react-datepicker';
import { Modal } from './components/Modal';
import { parseISO } from 'date-fns';
import { useState } from 'react';
import { convertCentsToEuros, getUKFormattedDate } from '../../utils/helpers';

const EditExpenseModal = ({ setIsOpen, okCallback, expense }) => {
  const [name, setName] = useState(expense.title);
  const [date, setDate] = useState(new Date(expense.date));
  const [wasDateValidated, setWasDateValidated] = useState(false);
  const [amount, setAmount] = useState(expense.amount);

  const handleDateChange = date => {
    setDate(date);
    setWasDateValidated(true);
  };

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
        <div
          className={`row d-flex ${wasDateValidated ? 'was-validated' : ''}`}
        >
          <label className="col-form-label col-2" htmlFor="date">
            Date
          </label>
          <div className="col-10">
            <DatePicker
              className="form-control"
              id="date"
              name="date"
              aria-describedby="dateHelp"
              required
              selected={date}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              todayButton="Today"
            />
          </div>
        </div>
        <div className="row">
          <label className="col-2">Amount</label>
          <input
            type="number"
            className="col-9"
            value={convertCentsToEuros(amount)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditExpenseModal;
