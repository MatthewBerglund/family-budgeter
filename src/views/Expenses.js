import AddExpensesForm from '../components/AddExpensesForm';
import ExpensesList from '../components/ExpensesList';
import ExpenseAddedAlert from '../components/ExpenseAddedAlert';
import ExpenseDeletedAlert from '../components/ExpenseDeletedAlert';
import { useState } from 'react';

const Expenses = ({
  expenses,
  setExpenses,
  filteredExpenses,
  setSelectedMonth,
  currentMonth,
}) => {
  const [expenseAdded, setExpenseAdded] = useState();
  const [expenseDeleted, setExpenseDeleted] = useState();
  const [lastDeleted, setLastDeleted] = useState({});

  const token = process.env.REACT_APP_MOSTASH_API_KEY;
  const baseURL = process.env.REACT_APP_MOSTASH_BASE_URL;
  const headers = {
    Stash: token,
    'Content-Type': 'application/json',
  };

  const addExpense = async newExpense => {
    const url = `${baseURL}/items.json?kind=expense`;
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(newExpense),
    };

    // Reset alerts in case user did not dismiss them
    setExpenseAdded(undefined);
    setExpenseDeleted(undefined);

    try {
      const response = await fetch(url, requestOptions);
      const newExpenseData = await response.json();
      setExpenses([...expenses, newExpenseData]);
      setExpenseAdded(true);
    } catch {
      setExpenseAdded(false);
    }
  };

  const removeExpense = async expense => {
    const { id } = expense;
    const url = `${baseURL}/items/${id}.json`;
    const requestOptions = { method: 'DELETE', headers };

    // Reset alerts in case user did not dismiss them
    setExpenseAdded(undefined);
    setExpenseDeleted(undefined);

    try {
      await fetch(url, requestOptions);
      // Remove expense item from state
      setExpenses(expenses.filter(expense => expense.id !== id));
      if (filteredExpenses.length === 1) setSelectedMonth(currentMonth);
      setExpenseDeleted(true);
      setLastDeleted(expense);
    } catch {
      setExpenseDeleted(false);
    }
  };

  return (
    <>
      <section className="row my-5">
        <div className="text-center">
          <h2 className="display-2">Expenses</h2>
        </div>
        <AddExpensesForm addExpense={addExpense} />
        <ExpensesList
          removeExpense={removeExpense}
          filteredExpenses={filteredExpenses}
        />
      </section>
      {expenseAdded === undefined ? null : (
        <ExpenseAddedAlert
          expenseAdded={expenseAdded}
          setExpenseAdded={setExpenseAdded}
        />
      )}
      {expenseDeleted === undefined ? null : (
        <ExpenseDeletedAlert
          expenseDeleted={expenseDeleted}
          setExpenseDeleted={setExpenseDeleted}
          {...lastDeleted}
        />
      )}
    </>
  );
};

export default Expenses;
