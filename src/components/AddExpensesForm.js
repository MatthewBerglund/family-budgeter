import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const AddExpensesForm = () => {
  const initialState = {
    id: '',
    name: '',
    date: '',
    amount: '',
  };

  const [singleExpense, setSingleExpense] = useState(initialState);
  const [expenses, setExpenses] = useState([]);

  const handleChange = (evt) => {
    // easy way to take any input name and assign its value to the initialState as long as they use the same key (e.g. <input name="amount"/> => singleExpense.amount)
    const { name, value } = evt.target;
    setSingleExpense({
      ...singleExpense,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const newExpenses = [...expenses, { ...singleExpense, id: uuid() }];
    setExpenses(newExpenses);
    setSingleExpense(initialState);
  };

  return (
    <div className="container-md">
      <div className="text-center">
        <h2 className="display-2">Add some Expenses</h2>
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
              onChange={handleChange}
              value={singleExpense.name}
              aria-label="Expense Name"
              placeholder="Expense Name"
            />
            <label htmlFor="amount">Expense Name</label>
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
              onChange={handleChange}
              value={singleExpense.date}
              aria-label="Expense date"
            />
            <label htmlFor="date">Expense Date</label>
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
            onChange={handleChange}
            value={singleExpense.amount}
            aria-label="Euro amount (with comma and two decimal places)"
            placeholder="Euro amount (with comma and two decimal places)"
          />
          <label htmlFor="amount">Expense amount in €</label>
        </div>
        <button className="btn btn-primary" type="submit">
          add
        </button>
      </form>
    </div>
  );
};

export default AddExpensesForm;
