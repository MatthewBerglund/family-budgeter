import AddExpensesForm from '../components/AddExpensesForm';
import ExpensesList from '../components/ExpensesList';
import { useState } from 'react';

const Expenses = ({
  selectedMonth,
  expenses,
  setExpenses,
  filteredExpenses,
  setSelectedMonth,
  currentMonth,
}) => {
  const [addedSuccessfully, setAddedSuccessfully] = useState();

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

    setAddedSuccessfully(undefined);

    try {
      const response = await fetch(url, requestOptions);
      const newExpenseData = await response.json();
      setExpenses([...expenses, newExpenseData]);
      setAddedSuccessfully(true);
    } catch {
      setAddedSuccessfully(false);
    }
  };

  const removeExpense = async id => {
    const url = `${baseURL}/items/${id}.json`;
    const requestOptions = { method: 'DELETE', headers };

    try {
      await fetch(url, requestOptions);
      // Remove expense item from state
      setExpenses(expenses.filter(expense => expense.id !== id));
      if (filteredExpenses.length === 1) setSelectedMonth(currentMonth);
    } catch {
      alert('Error deleting expense. Please try again later.');
    }
  };

  return (
    <section className="row my-5">
      <div className="text-center">
        <h2 className="display-2">Expenses</h2>
      </div>
      <AddExpensesForm
        addExpense={addExpense}
        addedSuccessfully={addedSuccessfully}
        setAddedSuccessfully={setAddedSuccessfully}
      />
      <ExpensesList
        expenses={expenses}
        removeExpense={removeExpense}
        selectedMonth={selectedMonth}
        filteredExpenses={filteredExpenses}
      />
    </section>
  );
};

export default Expenses;
