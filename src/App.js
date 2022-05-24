import { useState, useEffect } from 'react';
import { getUKFormattedDate, getCurrentMonth } from './utils/helpers';

import Summary from './views/Summary';
import AddExpenses from './views/AddExpenses';
import MonthSelector from './components/MonthSelector';
import ExpenseHistory from './views/ExpenseHistory';
import ExpenseAddedAlert from './components/Alerts/ExpenseAddedAlert';
import ExpenseDeletedAlert from './components/Alerts/ExpenseDeletedAlert';
import ConfirmMonthModal from './components/Modals/ConfirmMonthModal';
import ConfirmDeleteModal from './components/Modals/ConfirmDeleteModal';

const token = process.env.REACT_APP_MOSTASH_API_KEY;
const baseURL = process.env.REACT_APP_MOSTASH_BASE_URL;
const headers = {
  Stash: token,
  'Content-Type': 'application/json',
};

const App = () => {
  const currentMonth = getCurrentMonth();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  // newExpenseMonth is needed to compare with selected month
  // and trigger the ConfirmMonthModal if they are different
  const [newExpenseMonth, setNewExpenseMonth] = useState(selectedMonth);

  // `expenseAdded` and `expenseDeleted` can be undefined, true or false
  // alerts are hidden when these are undefined
  const [expenseAdded, setExpenseAdded] = useState();
  const [expenseDeleted, setExpenseDeleted] = useState();
  const [lastDeleted, setLastDeleted] = useState({});

  // states to toggle the modals
  const [confirmMonthModalIsOpen, setConfirmMonthModalIsOpen] = useState(false);
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] =
    useState(false);

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

  const closeExpenseAddedAlert = () => {
    setTimeout(() => setExpenseAdded(undefined), 5000);
  };

  const closeExpenseDeleteAlert = () => {
    setTimeout(() => setExpenseDeleted(undefined), 5000);
  };

  const addExpense = async newExpense => {
    const url = `${baseURL}/items.json?kind=expense`;
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(newExpense),
    };

    // Reset alerts in case user did not dismiss them. Still necessary?
    setExpenseAdded(undefined);
    setExpenseDeleted(undefined);

    try {
      const res = await fetch(url, requestOptions);
      const newExpense = await res.json();

      // Ensure that the catch block is called before setting local states
      if (!res.ok) {
        throw new Error('Something went wrong while adding the expense!');
      }

      if (newExpenseMonth !== selectedMonth) {
        setConfirmMonthModalIsOpen(true);
      }

      setExpenses([...expenses, newExpense]);
      setExpenseAdded(true);

      closeExpenseAddedAlert();
    } catch (error) {
      setExpenseAdded(false);
    }
  };

  const removeExpense = async id => {
    const url = `${baseURL}/items/${id}.json`;
    const requestOptions = { method: 'DELETE', headers };

    // Reset alerts in case user did not dismiss them.  Still necessary?
    setExpenseAdded(undefined);
    setExpenseDeleted(undefined);

    setConfirmDeleteModalIsOpen(true);

    try {
      const res = await fetch(url, requestOptions);

      // Ensure that the catch block is called before setting local states
      if (!res.ok) {
        throw new Error('Something went wrong while deleting the expense!');
      }

      setExpenses(expenses.filter(expense => expense.id !== id));

      if (filteredExpenses.length === 1) setSelectedMonth(currentMonth);
      setExpenseDeleted(true);
      setConfirmDeleteModalIsOpen(false);

      closeExpenseDeleteAlert();
    } catch (error) {
      setExpenseDeleted(false);
      setConfirmDeleteModalIsOpen(false);
    }
  };

  const changeMonthView = () => {
    setSelectedMonth(newExpenseMonth);
    setConfirmMonthModalIsOpen(false);
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
              setNewExpenseMonth={setNewExpenseMonth}
            />
          </section>
        </div>
        <div className="row g-5 mt-1">
          <section className="col">
            <ExpenseHistory
              filteredExpenses={filteredExpenses}
              setConfirmDeleteModalIsOpen={setConfirmDeleteModalIsOpen}
              setLastDeleted={setLastDeleted}
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
        {confirmMonthModalIsOpen && (
          <ConfirmMonthModal
            newExpenseMonth={newExpenseMonth}
            setIsOpen={setConfirmMonthModalIsOpen}
            okCallback={changeMonthView}
          />
        )}
        {confirmDeleteModalIsOpen && (
          <ConfirmDeleteModal
            expense={lastDeleted}
            setIsOpen={setConfirmDeleteModalIsOpen}
            okCallback={removeExpense}
          />
        )}
      </main>
    </>
  );
};

export default App;
