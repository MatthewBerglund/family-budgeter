import { useEffect, useState } from 'react';
import AddExpensesForm from '../components/AddExpensesForm';
import ExpensesList from '../components/ExpensesList';

// fetch details
const token = process.env.REACT_APP_MOSTASH_API_KEY;
const baseURL = process.env.REACT_APP_MOSTASH_BASE_URL;
const headers = {
  'Stash': token,
  'Content-Type': 'application/json'
};

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  // Run on initial render only
  useEffect(() => {
    // Fetch expense items
    fetch(`${baseURL}/items.json?stash=${token}&kind=expense`)
      .then(response => response.json())
      .then(expenseData => setExpenses(expenseData));
  }, []);

  const addExpense = (newExpense) => {
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(newExpense)
    };

    fetch(`${baseURL}/items.json?kind=expense`, requestOptions)
      .then(response => response.json())
      .then(newExpenseData => setExpenses([...expenses, newExpenseData]));
  }

  const removeExpense = (id) => {
    const requestOptions = { method: 'DELETE', headers };

    fetch(`${baseURL}/items/${id}.json`, requestOptions)
      .then(() => {
        // Remove expense item from state
        const indexToRemove = expenses.findIndex(expense => expense.id === id);
        const expensesCopy = [...expenses];
        expensesCopy.splice(indexToRemove, 1);
        setExpenses(expensesCopy);
      });
  }

  return (
    <section className="row my-5">
      <div className="text-center">
        <h2 className="display-2">Expenses</h2>
      </div>
      <AddExpensesForm addExpense={addExpense} />
      <ExpensesList expenses={expenses} removeExpense={removeExpense} />
    </section>
  );
};

export default Expenses;
