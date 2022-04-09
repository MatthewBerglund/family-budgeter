import Expense from './Expense';

const ExpensesList = ({ expenses, removeExpense, filteredExpenses }) => {
  const renderExpenses = () => {
    return filteredExpenses.map((expense) => (
      <Expense key={expense.id} {...expense} removeExpense={removeExpense} />
    ));
  };

  return (
    <section className="my-4">
      <div className="text-start">
        <h2>History</h2>
      </div>
      <ul className="list-group">
        {expenses.length > 0 && filteredExpenses.length > 0 ? (
          renderExpenses()
        ) : (
          <p>You have no prior expenses</p>
        )}
      </ul>
    </section>
  );
};

export default ExpensesList;
