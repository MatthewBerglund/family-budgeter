import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import AddExpensesForm from '../components/AddExpensesForm';
import ExpensesList from '../components/ExpensesList';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  // Run on initial render only
  useEffect(() => {
    const token = process.env.REACT_APP_MOSTASH_API_KEY;
    const url = `http://pi.motine.de:12305/items.json?stash=${token}&kind=expense`;
    fetch(url)
      .then(response => response.json())
      .then(data => setExpenses(data))
      .catch(error => console.log('error', error));
  }, []);

  const addExpense = (expenseObj) => {
    // const headers = new Headers();
    // headers.append("Content-Type", "application/json");
    // headers.append("Stash", process.env.REACT_APP_MOSTASH_API_KEY);

    // const requestOptions = {
    //   method: 'POST',
    //   headers,
    //   body: JSON.stringify(expenseObj),
    //   redirect: 'follow'
    // };

    // fetch("http://pi.motine.de:12305/items.json?kind=expense", requestOptions)
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.log('error', error));

    expenseObj.id = uuid();
    setExpenses([...expenses, expenseObj]);
  }

  const removeExpense = (id) => {
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
