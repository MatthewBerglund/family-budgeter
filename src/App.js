import { useState, useEffect } from 'react';
import { ref, remove } from 'firebase/database';
import { collection, addDoc, query, onSnapshot } from 'firebase/firestore';
import db from './firebase';
import { getUKFormattedDate, getCurrentMonth } from './utils/helpers';

import Summary from './views/Summary';
import AddExpenses from './views/AddExpenses';
import MonthSelector from './components/MonthSelector';
import ExpenseHistory from './views/ExpenseHistory';

import UserActionAlert from './components/Alerts/UserActionAlert';
import ConfirmMonthModal from './components/Modals/ConfirmMonthModal';
import ConfirmDeleteModal from './components/Modals/ConfirmDeleteModal';
import EditExpenseModal from './components/Modals/EditExpenseModal';

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
  const [expenseToEdit, setExpenseToEdit] = useState({});

  // states to toggle the modals
  const [editExpenseModalIsOpen, setEditExpenseModalIsOpen] = useState(false);
  const [confirmMonthModalIsOpen, setConfirmMonthModalIsOpen] = useState(false);
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] =
    useState(false);

  useEffect(() => {
    try {
      // Listen for changes to any doc in "expenses" collection and update expenses locally
      const q = query(collection(db, "expenses"));
      onSnapshot(q, (querySnapshot) => {
        const expensesArray = [];
        querySnapshot.forEach((doc) => {
          expensesArray.push(doc.data());
        });
        setExpenses([...expensesArray]);
      });
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

  const addExpense = async expense => {
    try {
      // Add expense data to new doc w/ ID inside "expenses" collection
      const expensesRef = collection(db, 'expenses');
      await addDoc(expensesRef, expense);

      if (newExpenseMonth !== selectedMonth) {
        setConfirmMonthModalIsOpen(true);
      }
    } catch (err) {
      console.log(err);
      setErrorOccurred(true);
    }

    setUserAction('add_expense');
    setIsAlertOpen(true);
  };

  const removeExpense = expenseId => {
    try {
      const expenseRef = ref(db, 'expenses/' + expenseId);
      remove(expenseRef);

      if (filteredExpenses.length === 1) {
        setSelectedMonth(currentMonth);
      };
    } catch (err) {
      setErrorOccurred(true);
    }

    setConfirmDeleteModalIsOpen(false);
    setUserAction('delete_expense');
    setIsAlertOpen(true);
  };

  const editExpense = async (id, newExpenseData) => {
    // const url = `${baseURL}/items/${id}.json?stash=${token}`;
    // const requestOptions = {
    //   method: 'PUT',
    //   headers,
    //   body: JSON.stringify(newExpenseData),
    // };

    // try {
    //   const res = await fetch(url, requestOptions);
    //   const updatedExpense = await res.json();

    //   if (!res.ok) {
    //     throw new Error('Something went wrong while editing the expense!');
    //   }

    //   const expensesCopy = [...expenses];
    //   const indexToEdit = expensesCopy.findIndex(expense => expense.id === id);
    //   expensesCopy.splice(indexToEdit, 1, updatedExpense);
    //   setExpenses(expensesCopy);

    //   // Handle month selection if moving last expense to a different month
    //   const updatedExpenseMonth = getUKFormattedDate(updatedExpense.date, {
    //     year: 'numeric',
    //     month: 'long',
    //   });

    //   if (updatedExpenseMonth !== selectedMonth && filteredExpenses.length === 1) {
    //     setSelectedMonth(currentMonth);
    //   }
    // } catch (error) {
    //   setErrorOccurred(true);
    // }

    // setUserAction('edit_expense');
    // setIsAlertOpen(true);
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
              setEditExpenseModalIsOpen={setEditExpenseModalIsOpen}
              setLastDeleted={setLastDeleted}
              setExpenseToEdit={setExpenseToEdit}
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
        {editExpenseModalIsOpen && (
          <EditExpenseModal
            expense={expenseToEdit}
            setIsOpen={setEditExpenseModalIsOpen}
            editExpense={editExpense}
          />
        )}
      </main>
    </>
  );
};

export default App;
