import { useContext, useState, useEffect } from 'react';

import Summary from './Summary';
import AddExpenses from './AddExpenses';
import MonthSelector from '../components/MonthSelector';
import ExpenseHistory from './ExpenseHistory';
import ConfirmMonthModal from '../components/Modals/ConfirmMonthModal'
import ConfirmDeleteModal from '../components/Modals/ConfirmDeleteModal';
import EditExpenseModal from '../components/Modals/EditExpenseModal';
import UserActionAlert from '../components/Alerts/UserActionAlert';

import { GlobalContext } from '../store/GlobalState';
import { getCurrentMonth } from '../utils/helpers';
import { getUKFormattedDate } from '../utils/helpers';

const UserDashboard = () => {
  const currentMonth = getCurrentMonth();

  const { expenses, isConfirmMonthModalOpen, isConfirmDeleteModalOpen, isEditExpenseModalOpen, isAlertOpen } = useContext(GlobalContext);

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const selectedMonthExpenses = expenses
    .filter(expense => {
      const expenseMonth = getUKFormattedDate(expense.date, { year: 'numeric', month: 'long' });
      return selectedMonth === expenseMonth;
    })
    .sort((expenseA, expenseB) => new Date(expenseB.date) - new Date(expenseA.date));;

  useEffect(() => {
    if (selectedMonthExpenses.length === 0) {
      changeMonthView(currentMonth);
    }
  });

  const changeMonthView = (month) => {
    setSelectedMonth(month);
  };

  return (
    <>
      <header className="navbar bg-dark bg-opacity-10">
        <div className="container">
          <div className="col-md-9">
            <h1 className="display-1 text-dark">Matt's budget</h1>
          </div>
          <div className="col-md-3">
            <MonthSelector changeMonthView={changeMonthView} />
          </div>
        </div>
      </header>
      <main className="container py-5">
        <div className="row g-5">
          <section className="col-lg-6">
            <Summary month={selectedMonth} expenses={selectedMonthExpenses} />
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
        {isConfirmMonthModalOpen && <ConfirmMonthModal changeMonthView={changeMonthView} />}
        {isConfirmDeleteModalOpen && <ConfirmDeleteModal />}
        {isEditExpenseModalOpen && <EditExpenseModal />}
        {isAlertOpen && <UserActionAlert />}
      </main>
    </>
  );
};

export default UserDashboard;