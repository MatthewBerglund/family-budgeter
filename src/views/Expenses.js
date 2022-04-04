import { useEffect, useState } from 'react';
import AddExpensesForm from '../components/AddExpensesForm';
import ExpensesList from '../components/ExpensesList';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  // Run on initial render only
  useEffect(() => {
    // Fetch expense items
    const token = process.env.REACT_APP_MOSTASH_API_KEY;
    const url = `http://pi.motine.de:12305/items.json?stash=${token}&kind=expense`;
    fetch(url)
      .then(response => response.json())
      .then(expenseData => setExpenses(expenseData))
      .catch(error => console.log('error', error));
  }, []);

  const addExpense = (expenseObj) => {
    const token = process.env.REACT_APP_MOSTASH_API_KEY;
    const url = `http://pi.motine.de:12305/items.json?stash=${token}&kind=expense`;

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(expenseObj)
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(postedExpense => setExpenses([...expenses, postedExpense]))
      .catch(error => console.log('error', error));
  }

  const removeExpense = (id) => {
    const token = process.env.REACT_APP_MOSTASH_API_KEY;
    const url = `http://pi.motine.de:12305/items/${id}.json&stash=${token}`;
    const requestOptions = { method: 'DELETE' };

    // Send DELETE request to mostash using expense id
    fetch(url, requestOptions);
    // (Fake) Then: remove the expense with the same id from state
    const indexToRemove = expenses.findIndex(expense => expense.id === id);
    const expensesCopy = [...expenses];
    expensesCopy.splice(indexToRemove, 1);
    setExpenses(expensesCopy);
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
