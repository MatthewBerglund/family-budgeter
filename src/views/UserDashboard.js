import { useContext } from 'react';

import Summary from './Summary';
import AddExpenses from './AddExpenses';
import MonthSelector from '../components/MonthSelector';
import ExpenseHistory from './ExpenseHistory';
import ConfirmMonthModal from '../components/Modals/ConfirmMonthModal'
import ConfirmDeleteModal from '../components/Modals/ConfirmDeleteModal';
import EditExpenseModal from '../components/Modals/EditExpenseModal';
import UserActionAlert from '../components/Alerts/UserActionAlert';

import { GlobalContext } from '../store/GlobalState';

const UserDashboard = () => {
  const { isConfirmMonthModalOpen, isConfirmDeleteModalOpen, isEditExpenseModalOpen, isAlertOpen } = useContext(GlobalContext);

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
            <Summary />
          </section>
          <section className="col-lg-6">
            <AddExpenses />
          </section>
        </div>
        <div className="row g-5 mt-1">
          <section className="col">
            <ExpenseHistory />
          </section>
        </div>
        {isConfirmMonthModalOpen && <ConfirmMonthModal />}
        {isConfirmDeleteModalOpen && <ConfirmDeleteModal />}
        {isEditExpenseModalOpen && <EditExpenseModal />}
        {isAlertOpen && <UserActionAlert />}
      </main>
    </>
  );
};

export default UserDashboard;
