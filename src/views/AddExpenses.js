import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';

import ChangeMonthModal from '../components/Modals/ChangeMonthModal';

import { convertEurosToCents, getUKFormattedDate } from '../utils/helpers';
import Expense from '../expense';


const AddExpenses = ({ selectedMonth, showAlert, changeMonthView }) => {
  const [title, setTitle] = useState('');
  const [wasTitleValidated, setWasTitleValidated] = useState(false);
  const [date, setDate] = useState('');
  const [wasDateValidated, setWasDateValidated] = useState(false);
  const [amount, setAmount] = useState('');
  const [wasAmountValidated, setWasAmountValidated] = useState(false);

  const changeMonthModalRef = useRef(null);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await Expense.add(title, date.toString(), convertEurosToCents(amount));
      const expenseMonth = getUKFormattedDate(date, { year: 'numeric', month: 'long' });
      if (expenseMonth !== selectedMonth) {
        openChangeMonthModal(expenseMonth);
      }
      showAlert('success', 'Expense added', 'Your expense has been successfully added.');
    } catch (err) {
      console.log(err);
      showAlert('danger', 'Error adding expense', 'The expense could not be added. Please try again.');
    }

    setTitle('');
    setDate('');
    setAmount('');
    setWasTitleValidated(false);
    setWasDateValidated(false);
    setWasAmountValidated(false);
  };

  const openChangeMonthModal = (month) => {
    changeMonthModalRef.current.show(month);
  }

  return (
    <>
      <ChangeMonthModal ref={changeMonthModalRef} changeMonthView={changeMonthView} />
      <div className="card h-100">
        <h3 className="card-header">Add expense</h3>
        <div className="card-body">
          <form className="row g-2" onSubmit={handleSubmit}>
            <div className={`col-lg-6 ${wasTitleValidated ? 'was-validated' : ''}`}>
              <label className="form-label" htmlFor="name">
                Expense name
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Groceries"
                aria-describedby="nameHelp"
                required
                autoFocus
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                  setWasTitleValidated(true);
                }}
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
                dateFormat="dd/MM/yyyy"
                todayButton="Today"
                onChange={date => {
                  setDate(date);
                  setWasDateValidated(true);
                }}
              />
            </div>
            <div className={`col mb-2 ${wasAmountValidated ? 'was-validated' : ''}`}>
              <label className="form-label" htmlFor="amount">
                Expense amount
              </label>
              <div className="input-group">
                <span className="input-group-text">€</span>
                <input
                  className="form-control"
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="e.g. 19.99"
                  aria-describedby="amountHelp"
                  required
                  min="0.01"
                  step="0.01"
                  value={amount}
                  onChange={e => {
                    setAmount(e.target.value);
                    setWasAmountValidated(true);
                  }}
                />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddExpenses;
