import { useState, useRef, useContext } from 'react';
import DatePicker from 'react-datepicker';

import Modal from './components/Modal';

import { convertCentsToEuros, convertEurosToCents } from '../../utils/helpers';
import { GlobalContext } from '../../store/GlobalState';

const EditExpenseModal = () => {
  const { expenseToEdit, editExpense, closeEditExpenseModal } = useContext(GlobalContext);

  const [title, setTitle] = useState(expenseToEdit.title);
  const [date, setDate] = useState(new Date(expenseToEdit.date));
  const [amount, setAmount] = useState(convertCentsToEuros(expenseToEdit.amount));
  const formEl = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    const newExpenseData = {
      title,
      date: date.toString(),
      amount: convertEurosToCents(amount),
    };
    editExpense(expenseToEdit.id, newExpenseData);
  };

  const modalProps = {
    cancelCallback: () => closeEditExpenseModal(),
    modalTitle: 'Edit expense',
    cancelButtonLabel: 'Cancel',
    okButtonLabel: 'Save',
    okButtonColor: 'btn-primary',
    form: 'edit-expense-form',
  };

  return (
    <Modal {...modalProps}>
      <form
        ref={formEl}
        className="container d-grid gap-3 mb-3"
        id="edit-expense-form"
        onSubmit={handleSubmit}
      >
        <div className="row">
          <label className="col-form-label col-2">Name</label>
          <div className="col-10">
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row">
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
              onChange={date => setDate(date)}
              dateFormat="dd/MM/yyyy"
              todayButton="Today"
            />
          </div>
        </div>
        <div className="row">
          <label className="col-form-label col-2">Amount</label>
          <div className="col-10">
            <div className="input-group">
              <span className="input-group-text">€</span>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditExpenseModal;
