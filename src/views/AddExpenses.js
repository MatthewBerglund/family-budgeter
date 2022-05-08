import { useState } from 'react';
import { convertEurosToCents, getUKFormattedDate } from '../utils/helpers';

const AddExpenses = ({ addExpense, setMonthToShow }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    const expense = { title, date, amount: convertEurosToCents(amount) };
    addExpense(expense);
    setTitle('');
    setDate('');
    setAmount('');
  };

  return (
    <div className="card h-100">
      <h3 className="card-header">Add expense</h3>
      <div className="card-body">
        <form className="row g-2" onSubmit={handleSubmit}>
          <div className="col-lg-6">
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                id="name"
                name="name"
                required
                onChange={evt => setTitle(evt.target.value)}
                value={title}
                placeholder="Expense Name"
              />
              <label htmlFor="name">Expense name</label>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-floating">
              <input
                className="form-control"
                type="date"
                id="date"
                name="date"
                required
                onChange={evt => {
                  setDate(evt.target.value);
                  setMonthToShow(
                    getUKFormattedDate(evt.target.value, {
                      year: 'numeric',
                      month: 'long',
                    })
                  );
                }}
                value={date}
                placeholder="Expense Date"
              />
              <label htmlFor="date">Expense date</label>
            </div>
          </div>
          <div className="form-floating mb-2">
            <input
              className="form-control"
              type="number"
              id="amount"
              name="amount"
              required
              min="0.01"
              step="0.01"
              onChange={evt => setAmount(evt.target.value)}
              value={amount}
              placeholder="Euro amount (with comma and two decimal places)"
            />
            <label htmlFor="amount">Expense amount in €</label>
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
