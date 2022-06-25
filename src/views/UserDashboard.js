import { useEffect, useState, useContext } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { getCurrentMonth } from '../utils/helpers';
import db from '../firebase';

import Summary from './Summary';
import AddExpenses from './AddExpenses';
import MonthSelector from '../components/MonthSelector';
import ExpenseHistory from './ExpenseHistory';
import { GlobalContext } from '../GlobalState';
import { getUKFormattedDate } from '../utils/helpers';

const UserDashboard = () => {
  const { restoreExpenses, expenses, currentMonth } = useContext(GlobalContext);

  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [selectedMonthExpenses, setSelectedMonthExpenses] = useState([]);

  // const changeMonthView = (month) => {
  //   setSelectedMonth(month);
  //   setConfirmMonthModalIsOpen(false);
  // };

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
        restoreExpenses(expensesArray);
      });
    } catch (err) {
      console.log(err);
      alert('Error loading expenses. Please try again later.');
    }
  }, []);

  useEffect(() => {
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
            <MonthSelector
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
      </main>
    </>
  );
};

export default UserDashboard;