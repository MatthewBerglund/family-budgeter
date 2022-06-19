import Expense from '../components/Expense';

const ExpensesHistory = ({ filteredExpenses, setConfirmDeleteModalIsOpen, setEditExpenseModalIsOpen, setLastDeleted, setExpenseToEdit }) => {
  const sortedExpenses = filteredExpenses.sort((expenseA, expenseB) => {
    return new Date(expenseB.date) - new Date(expenseA.date);
  });

  return (
    <div className="card">
      <h3 className="card-header text-start">History</h3>
      <div className="card-body">
        <ul className="list-group list-group-flush" data-cy="expenses">
          {filteredExpenses.length > 0 ? sortedExpenses.map(expense => <Expense key={expense.id} expense={expense} setConfirmDeleteModalIsOpen={setConfirmDeleteModalIsOpen} setEditExpenseModalIsOpen={setEditExpenseModalIsOpen} setLastDeleted={setLastDeleted} setExpenseToEdit={setExpenseToEdit} />) : <p className="m-0">You have no prior expenses</p>}
        </ul>
      </div>
    </div>
  );
};

export default ExpensesHistory;
