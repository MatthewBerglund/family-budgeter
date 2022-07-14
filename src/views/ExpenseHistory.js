import Expense from '../components/Expense';

const ExpensesHistory = ({ expenses, showAlert }) => {
  return (
    <div className="card">
      <h3 className="card-header text-start">History</h3>
      <div className="card-body">
        <ul className="list-group list-group-flush" data-cy="expenses">
          {expenses.length > 0 ? (
            expenses.map(expense => (
              <Expense
                key={expense.id}
                expense={expense}
                showAlert={showAlert}
              />
            ))
          ) : (
            <p className="m-0">You have no prior expenses</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ExpensesHistory;
