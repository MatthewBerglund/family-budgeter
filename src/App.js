import { useState, useEffect } from 'react';
import { ref, push, set, onValue } from 'firebase/database';
import db from './firebase';
import { getUKFormattedDate, getCurrentMonth } from './utils/helpers';

import Summary from './views/Summary';
import AddExpenses from './views/AddExpenses';
import MonthSelector from './components/MonthSelector';
import ExpenseHistory from './views/ExpenseHistory';

import UserActionAlert from './components/Alerts/UserActionAlert';
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

  // variables for toggling alert visibility and state
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [userAction, setUserAction] = useState('');
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [lastDeleted, setLastDeleted] = useState({});

  // states to toggle the modals
  const [confirmMonthModalIsOpen, setConfirmMonthModalIsOpen] = useState(false);
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] =
    useState(false);

  // Add event listener to get expenses from db on value change 
  useEffect(() => {
    const handleValueChange = snapshot => {
      const expensesObj = snapshot.val();
      const keys = Object.keys(expensesObj);
      const expenseValues = Object.values(expensesObj);
      const expensesArray = expenseValues.map((expense, index) => {
        return { ...expense, id: keys[index] };
      });

      setExpenses(expensesArray);
    };

    try {
      const expensesRef = ref(db, 'expenses');
      onValue(expensesRef, handleValueChange);
    } catch (err) {
      console.log(err);
      alert('Error loading expenses. Please try again later.');
    }
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

  const closeAlert = () => setIsAlertOpen(false);

  const addExpense = expense => {
    try {
      const expensesRef = ref(db, 'expenses');
      const newExpenseRef = push(expensesRef);
      set(newExpenseRef, expense);

      if (newExpenseMonth !== selectedMonth) {
        setConfirmMonthModalIsOpen(true);
      }
    } catch (err) {
      setErrorOccurred(true);
    }

    setUserAction('add_expense');
    setIsAlertOpen(true);
  };

  const removeExpense = async id => {
    const url = `${baseURL}/items/${id}.json`;
    const requestOptions = { method: 'DELETE', headers };

    setConfirmDeleteModalIsOpen(true);

    try {
      const res = await fetch(url, requestOptions);

      // Ensure that the catch block is called before setting local states
      if (!res.ok) {
        throw new Error('Something went wrong while deleting the expense!');
      }

      setExpenses(expenses.filter(expense => expense.id !== id));

      if (filteredExpenses.length === 1) setSelectedMonth(currentMonth);
      setConfirmDeleteModalIsOpen(false);
    } catch (error) {
      setErrorOccurred(true);
      setConfirmDeleteModalIsOpen(false);
    }

    setUserAction('delete_expense');
    setIsAlertOpen(true);
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
        {isAlertOpen && (
          <UserActionAlert
            userAction={userAction}
            errorOccurred={errorOccurred}
            closeCallback={closeAlert}
            expense={lastDeleted}
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
