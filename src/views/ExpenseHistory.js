import Expense from '../components/Expense';
import { useGlobalState } from '../utils/hooks';

const ExpensesHistory = () => {
  const { selectedMonthExpenses } = useGlobalState();

  return (
    <div className="card">
      <h3 className="card-header text-start">History</h3>
      <div className="card-body">
        <ul className="list-group list-group-flush" data-cy="expenses">
          {selectedMonthExpenses.length > 0 ? (
            selectedMonthExpenses.map(expense => <Expense key={expense.id} expense={expense} />)
          ) : (
            <p className="m-0">You have no prior expenses</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ExpensesHistory;
