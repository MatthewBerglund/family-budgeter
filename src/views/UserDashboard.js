import { useEffect } from 'react';
import { collection, doc, addDoc, deleteDoc, updateDoc, query, onSnapshot } from 'firebase/firestore';
import { getUKFormattedDate, getCurrentMonth } from '../utils/helpers';
import db from '../firebase';

import Summary from './Summary';
import AddExpenses from './AddExpenses';
import MonthSelector from '../components/MonthSelector';
import ExpenseHistory from './ExpenseHistory';

import UserActionAlert from '../components/Alerts/UserActionAlert';
import ConfirmMonthModal from '../components/Modals/ConfirmMonthModal';
import ConfirmDeleteModal from '../components/Modals/ConfirmDeleteModal';
import EditExpenseModal from '../components/Modals/EditExpenseModal';

const UserDashboard = () => {

  const changeMonthView = (month) => {
    setSelectedMonth(month);
    setConfirmMonthModalIsOpen(false);
  };

  useEffect(() => {
    try {
      // Listen for changes to any doc in "expenses" collection and update expenses locally
      const q = query(collection(db, 'expenses'));
      onSnapshot(q, querySnapshot => {
        const expensesArray = [];
        querySnapshot.forEach(doc => {
          let expense = { ...doc.data(), id: doc.id };
          expensesArray.push(expense);
        });
        setExpenses(expensesArray); // <== dispatch RESTORE_EXPENSES w/ payload `expenseArray`
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

  const removeExpense = async expenseId => {
    try {
      const expenseRef = doc(db, 'expenses', expenseId);
      await deleteDoc(expenseRef);

      if (filteredExpenses.length === 1) {
        setSelectedMonth(currentMonth);
      }
    } catch (err) {
      console.log(err);
      setErrorOccurred(true);
    }

    setConfirmDeleteModalIsOpen(false);
    setUserAction('delete_expense');
    setIsAlertOpen(true);
  };

  const editExpense = async (expenseId, newExpenseData) => {
    try {
      const expenseRef = doc(db, 'expenses', expenseId);
      await updateDoc(expenseRef, newExpenseData);

      const updatedExpenseMonth = getUKFormattedDate(newExpenseData.date, {
        year: 'numeric',
        month: 'long',
      });

      if (
        updatedExpenseMonth !== selectedMonth &&
        filteredExpenses.length === 1
      ) {
        setSelectedMonth(currentMonth);
      }
    } catch (err) {
      console.log(err);
      setErrorOccurred(true);
    }

    setUserAction('edit_expense');
    setIsAlertOpen(true);
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

export default UserDashboard;