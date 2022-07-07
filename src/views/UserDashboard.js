import { useContext, useState, useEffect, useRef } from 'react';

import Summary from './Summary';
import AddExpenses from './AddExpenses';
import MonthSelector from '../components/MonthSelector';
import ExpenseHistory from './ExpenseHistory';
import ChangeMonthModal from '../components/Modals/ChangeMonthModal'
import DeleteExpenseModal from '../components/Modals/DeleteExpenseModal';
import EditExpenseModal from '../components/Modals/EditExpenseModal';
import Alert from '../components/Alerts/Alert';

import { GlobalContext } from '../store/GlobalState';
import { getCurrentMonth, getExpenseMonth } from '../utils/helpers';

const UserDashboard = () => {
  const currentMonth = getCurrentMonth();

  const { expenses } = useContext(GlobalContext);

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const selectedMonthExpenses = expenses
    .filter(expense => getExpenseMonth(expense) === selectedMonth)
    .sort((expenseA, expenseB) => new Date(expenseB.date) - new Date(expenseA.date));

  useEffect(() => {
    if (selectedMonthExpenses.length === 0) {
      changeMonthView(currentMonth);
    }
  });

  // Modals and alert refs and functions
  const changeMonthModalRef = useRef(null);
  const deleteExpenseModalRef = useRef(null);
  const editExpenseModalRef = useRef(null);
  const alertRef = useRef(null);

  const changeMonthView = (month) => {
    setSelectedMonth(month);
  };

  const openChangeMonthModal = (month) => {
    changeMonthModalRef.current.show(month);
  }

  const openDeleteExpenseModal = (expense) => {
    deleteExpenseModalRef.current.show(expense);
  };

  const openEditExpenseModal = (expense) => {
    editExpenseModalRef.current.show(expense);
  };

  const showAlert = (type, title, message) => {
    alertRef.current.show(type, title, message);
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
              selectedMonth={selectedMonth}
              changeMonthView={changeMonthView}
            />
          </div>
        </div>
      </header>
      <main className="container py-5">
        <div className="row g-5">
          <section className="col-lg-6">
            <Summary month={selectedMonth} expenses={selectedMonthExpenses} />
          </section>
          <section className="col-lg-6">
            <AddExpenses
              selectedMonth={selectedMonth}
              showAlert={showAlert}
              openChangeMonthModal={openChangeMonthModal}
            />
          </section>
        </div>
        <div className="row g-5 mt-1">
          <section className="col">
            <ExpenseHistory
              expenses={selectedMonthExpenses}
              openDeleteExpenseModal={openDeleteExpenseModal}
              openEditExpenseModal={openEditExpenseModal}
            />
          </section>
        </div>
        <ChangeMonthModal ref={changeMonthModalRef} changeMonthView={changeMonthView} />
        <DeleteExpenseModal ref={deleteExpenseModalRef} showAlert={showAlert} />
        <EditExpenseModal ref={editExpenseModalRef} showAlert={showAlert} />
        <Alert ref={alertRef} />
      </main>
    </>
  );
};

export default UserDashboard;
