import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import AddExpensesForm from '../components/AddExpensesForm';
import ExpensesList from '../components/ExpensesList';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  // Run on initial render only (dependency list is empty)
  useEffect(() => {
    // Function definition pulled inside `useEffect` in order to keep dependency list empty
    const fetchExpenses = async () => {
      const token = process.env.REACT_APP_MOSTASH_API_KEY;
      const url = `http://pi.motine.de:12305/items.json?stash=${token}&kind=expense`;
      const response = await fetch(url);
      const data = await response.json();
      setExpenses(data);
    };

    fetchExpenses().catch(error => {
      console.log(error);
    });
  }, []);

  const addExpense = (title, date, amount) => {
    setExpenses([...expenses, { id: uuid(), title, date, amount }]);
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
