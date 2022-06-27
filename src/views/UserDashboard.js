import { useEffect, useState, useContext } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';

import Summary from './Summary';
import AddExpenses from './AddExpenses';
import MonthSelector from '../components/MonthSelector';
import ExpenseHistory from './ExpenseHistory';
import ConfirmMonthModal from '../components/Modals/ConfirmMonthModal'
import ConfirmDeleteModal from '../components/Modals/ConfirmDeleteModal';
import UserActionAlert from '../components/Alerts/UserActionAlert';

import db from '../firebase';
import { GlobalContext } from '../GlobalState';
import { getUKFormattedDate } from '../utils/helpers';

const UserDashboard = () => {
  const { expenses, selectedMonth, isConfirmMonthModalOpen, isConfirmDeleteModalOpen, isAlertOpen, restoreExpenses } = useContext(GlobalContext);

  const [selectedMonthExpenses, setSelectedMonthExpenses] = useState([]);

  useEffect(() => {
    try {
      // Listen for changes to any doc in "expenses" collection and update expenses locally
      const q = query(collection(db, 'expenses'));
      onSnapshot(q, restoreExpenses);
    } catch (err) {
      console.log(err);
      alert('Error loading expenses. Please try again later.');
    }
  }, []);

  useEffect(() => {
    // Filter for expenses that belong in the selected month
    const filteredExpenses = expenses
      .filter(expense => {
        const expenseMonth = getUKFormattedDate(new Date(expense.date), { year: 'numeric', month: 'long' });
        return selectedMonth === expenseMonth;
      })
      .sort((expenseA, expenseB) => new Date(expenseB.date) - new Date(expenseA.date));

    setSelectedMonthExpenses(filteredExpenses);
  }, [expenses, selectedMonth]);

  return (
    <>
      <header className="navbar bg-dark bg-opacity-10">
        <div className="container">
          <div className="col-md-9">
            <h1 className="display-1 text-dark">Matt's budget</h1>
          </div>
          <div className="col-md-3">
            <MonthSelector />
          </div>
        </div>
      </header>
      <main className="container py-5">
        <div className="row g-5">
          <section className="col-lg-6">
            <Summary
              selectedMonth={selectedMonth}
              expenses={selectedMonthExpenses}
            />
          </section>
          <section className="col-lg-6">
            <AddExpenses />
          </section>
        </div>
        <div className="row g-5 mt-1">
          <section className="col">
            <ExpenseHistory expenses={selectedMonthExpenses} />
          </section>
        </div>
        {isConfirmMonthModalOpen && <ConfirmMonthModal />}
        {isConfirmDeleteModalOpen && <ConfirmDeleteModal />}
        {isAlertOpen && <UserActionAlert />}
      </main>
    </>
  );
};

export default UserDashboard;