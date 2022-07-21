import { useContext, useState, useEffect, useRef } from 'react';

import Summary from './Summary';
import AddExpenses from './AddExpenses';
import MonthSelector from '../components/MonthSelector';
import ExpenseHistory from './ExpenseHistory';
import Alert from '../components/Alerts/Alert';

import { GlobalContext } from '../store/GlobalState';
import { getCurrentMonth } from '../utils/helpers';

const UserDashboard = () => {
  const currentMonth = getCurrentMonth();

  const { expenses } = useContext(GlobalContext);

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const selectedMonthExpenses = expenses
    .filter(expense => expense.getMonth() === selectedMonth)
    .sort((expenseA, expenseB) => new Date(expenseB.date) - new Date(expenseA.date));

  useEffect(() => {
    if (selectedMonthExpenses.length === 0) {
      changeMonthView(currentMonth);
    }
  });

  const alertRef = useRef(null);

  const showAlert = (type, title, message) => {
    alertRef.current.show(type, title, message);
  };

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
              changeMonthView={changeMonthView}
            />
          </section>
        </div>
        <div className="row g-5 mt-1">
          <section className="col">
            <ExpenseHistory expenses={selectedMonthExpenses} showAlert={showAlert} />
          </section>
        </div>
        <Alert ref={alertRef} />
      </main>
    </>
  );
};

export default UserDashboard;
