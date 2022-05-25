import { useState } from 'react';
import { convertEurosToCents, getUKFormattedDate } from '../utils/helpers';
import DatePicker from 'react-datepicker';

const AddExpenses = ({ addExpense, setNewExpenseMonth }) => {
  const [title, setTitle] = useState('');
  const [wasTitleValidated, setWasTitleValidated] = useState(false);
  const [date, setDate] = useState('');
  const [wasDateValidated, setWasDateValidated] = useState(false);
  const [amount, setAmount] = useState('');
  const [wasAmountValidated, setWasAmountValidated] = useState(false);

  const handleSubmit = evt => {
    evt.preventDefault();
    const expense = { title, date, amount: convertEurosToCents(amount) };
    addExpense(expense);
    setTitle('');
    setDate('');
    setAmount('');
    setWasTitleValidated(false);
    setWasDateValidated(false);
    setWasAmountValidated(false);
  };

  const handleTitleChange = evt => {
    setTitle(evt.target.value);
    setWasTitleValidated(true);
  };

  const handleDateChange = date => {
    setDate(date);
    setWasDateValidated(true);
    // newExpenseMonth is needed to compare with selected month
    // and trigger the ConfirmMonthModal if they are different
    setNewExpenseMonth(
      getUKFormattedDate(date, { year: 'numeric', month: 'long' })
    );
  };

  const handleAmountChange = evt => {
    setAmount(evt.target.value);
    setWasAmountValidated(true);
  };

  return (
    <div className="card h-100">
      <h3 className="card-header">Add expense</h3>
      <div className="card-body">
        <form className="row g-2" onSubmit={handleSubmit}>
          <div
            className={`col-lg-6 ${wasTitleValidated ? 'was-validated' : ''}`}
          >
            <label className="form-label" htmlFor="name">
              Expense name
            </label>
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              placeholder="e.g. 'Groceries'"
              aria-describedby="nameHelp"
              required
              autoFocus
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div
            className={`col-lg-6 ${wasDateValidated ? 'was-validated' : ''}`}
            // Inline style required because the datePicker is relatively positioned to its container
            // Bootstrap '.was-validated' class adds 'z-index: 5' to each validated field, causing the datepicker to render behind the validated input-amount
            style={{ zIndex: 6 }}
            data-cy="dateParent"
          >
            <label className="form-label" htmlFor="date">
              Expense date
            </label>
            <DatePicker
              className="form-control"
              id="date"
              name="date"
              placeholderText="DD/MM/YYYY"
              aria-describedby="dateHelp"
              required
              selected={date}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              todayButton="Today"
            />
          </div>
          <div
            className={`col mb-2 ${wasAmountValidated ? 'was-validated' : ''}`}
          >
            <label className="form-label" htmlFor="amount">
              Expense amount in €
            </label>
            <div className="input-group">
              <span className="input-group-text">€</span>
              <input
                className="form-control"
                type="number"
                id="amount"
                name="amount"
                placeholder="e.g. '19.99'"
                aria-describedby="amountHelp"
                required
                min="0.01"
                step="0.01"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenses;
