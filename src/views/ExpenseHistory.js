import Expense from '../components/Expense';

const ExpensesList = ({ removeExpense, filteredExpenses }) => {
  const renderExpenses = () => {
    return filteredExpenses.map(expense => (
      <Expense key={expense.id} {...expense} removeExpense={removeExpense} />
    ));
  };

  return (
    <div className="card">
      <h3 className="card-header text-start">History</h3>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {filteredExpenses.length > 0 ? (
            renderExpenses()
          ) : (
            <p>You have no prior expenses</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ExpensesList;
