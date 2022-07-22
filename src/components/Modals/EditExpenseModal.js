import { useState, useRef, useContext, forwardRef, useImperativeHandle } from 'react';
import DatePicker from 'react-datepicker';

import Modal from './components/Modal';

import { convertCentsToEuros, convertEurosToCents } from '../../utils/helpers';
import { GlobalContext } from '../../store/GlobalState';

const EditExpenseModal = forwardRef((props, ref) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false);

  const formEl = useRef(null);

  const { editExpense } = useContext(GlobalContext);
  const { showAlert } = props;

  useImperativeHandle(ref, () => ({
    show: expense => {
      setTitle(expense.title);
      setDate(new Date(expense.date));
      setAmount(expense.getFormattedAmount());
      setId(expense.id);
      setShowModal(true);
    },
  }));

  const handleSubmit = async e => {
    e.preventDefault();
    setShowModal(false);

    const newExpenseData = {
      title,
      date: date.toString(),
      amount: convertEurosToCents(amount),
    };

    try {
      await editExpense(id, newExpenseData);
      showAlert('success', 'Expense edited', 'The new expense information has been successfully saved.');
    } catch (err) {
      console.log(err);
      showAlert('danger', 'Error editing expense', 'The new expense information could not be saved. Please try again.');
    }
  };

  const modalProps = {
    cancelCallback: () => setShowModal(false),
    modalTitle: 'Edit expense',
    cancelButtonLabel: 'Cancel',
    okButtonLabel: 'Save',
    okButtonColor: 'btn-primary',
    form: 'edit-expense-form',
  };

  return (
    showModal && <Modal {...modalProps}>
      <form
        ref={formEl}
        className="container d-grid gap-3 mb-3 px-0"
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
});

export default EditExpenseModal;
