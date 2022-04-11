import { useState } from 'react';
import ExpenseAddedAlert from './ExpenseAddedAlert';

const AddExpensesForm = ({ addExpense }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    const expense = { title, date, amount };
    addExpense(expense);
    setTitle('');
    setDate('');
    setAmount('');
  };

  return (
    <section className="my-4">
      <div className="text-start">
        <h2>Add new expense</h2>
      </div>
      <form className="row g-2" onSubmit={handleSubmit}>
        <div className="col-md">
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
            <label htmlFor="amount">Expense name</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating">
            <input
              className="form-control"
              type="date"
              id="date"
              name="date"
              required
              onChange={evt => setDate(evt.target.value)}
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
    </section>
  );
};

export default AddExpensesForm;
