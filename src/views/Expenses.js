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
    const fetchExpenses = async () => {
      const url = `${baseURL}/items.json?stash=${token}&kind=expense`;

      try {
        const response = await fetch(url);
        const expenseData = await response.json();
        setExpenses(expenseData);
      } catch {
        alert('Error loading expenses. Please try again later.');
      }
    }

    fetchExpenses();
  }, []);

  const addExpense = async (newExpense) => {
    const url = `${baseURL}/items.json?kind=expense`;
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(newExpense)
    };

    try {
      const response = await fetch(url, requestOptions);
      const newExpenseData = await response.json();
      setExpenses([...expenses, newExpenseData]);
    } catch {
      alert('Error adding expense. Please try again later.');
    }
  }

  const removeExpense = (id) => {
    const requestOptions = { method: 'DELETE', headers };
    fetch(`${baseURL}/items/${id}.json`, requestOptions)
      .then(() => {
        // Remove expense item from state
        setExpenses(expenses.filter(expense => expense.id !== id));
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
