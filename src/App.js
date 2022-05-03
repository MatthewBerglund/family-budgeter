import { useState, useEffect } from 'react';
import { getUKFormattedDate, getCurrentMonth } from './utils/helpers';

import Summary from './views/Summary';
import AddExpenses from './views/AddExpenses';
import MonthSelector from './components/MonthSelector';
import ExpenseHistory from './views/ExpenseHistory';
import ExpenseAddedAlert from './components/ExpenseAddedAlert';
import ExpenseDeletedAlert from './components/ExpenseDeletedAlert';

const token = process.env.REACT_APP_MOSTASH_API_KEY;
const baseURL = process.env.REACT_APP_MOSTASH_BASE_URL;
const headers = {
  Stash: token,
  'Content-Type': 'application/json',
};

function App() {
  const currentMonth = getCurrentMonth();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  // `expenseAdded` and `expenseDeleted` can be undefined, true or false
  // alerts are hidden when these are undefined
  const [expenseAdded, setExpenseAdded] = useState();
  const [expenseDeleted, setExpenseDeleted] = useState();
  const [lastDeleted, setLastDeleted] = useState({});

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
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    const expensesToRender = expenses.filter(expense => {
      let formattedExpenseDate = getUKFormattedDate(new Date(expense.date), {
        year: 'numeric',
        month: 'long',
      });
      return selectedMonth === formattedExpenseDate;
    });
    setFilteredExpenses(expensesToRender);
  }, [expenses, selectedMonth]);

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
      setTimeout(() => setExpenseAdded(undefined), 5000);
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
      setLastDeleted({ ...expense });
      setExpenses(expenses.filter(expense => expense.id !== id));
      if (filteredExpenses.length === 1) setSelectedMonth(currentMonth);
      setExpenseDeleted(true);
      setTimeout(() => setExpenseDeleted(undefined), 5000);
    } catch {
      setExpenseDeleted(false);
    }
  };

  return (
    <>
      <header className="navbar bg-dark bg-opacity-10">
        <div className="container">
          <div className="col-md-9">
            <h1 className="display-1 text-dark">Matt's budget</h1>
          </div>
          <div className="col-md-3">
            <MonthSelector
              expenses={expenses}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
          </div>
        </div>
      </header>
      <main className="container py-5">
        <div className="row g-5">
          <section className="col-lg-6">
            <Summary
              currentMonth={currentMonth}
              selectedMonth={selectedMonth}
              filteredExpenses={filteredExpenses}
            />
          </section>
          <section className="col-lg-6">
            <AddExpenses
              addExpense={addExpense}
              expenseAdded={expenseAdded}
              setExpenseAdded={setExpenseAdded}
              expenseDeleted={setExpenseDeleted}
              setExpenseDeleted={setExpenseDeleted}
              lastDeleted={lastDeleted}
            />
          </section>
        </div>
        <div className="row g-5 mt-1">
          <section className="col">
            <ExpenseHistory
              removeExpense={removeExpense}
              filteredExpenses={filteredExpenses}
            />
          </section>
        </div>
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
      </main>
    </>
  );
}

export default App;
