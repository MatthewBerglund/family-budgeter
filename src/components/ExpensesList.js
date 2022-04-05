import Expense from "./Expense";

const ExpensesList = ({ expenses, removeExpense }) => {
  const renderExpenses = () => {
    const expenseItems = expenses.map(expense => (
      <Expense
        key={expense.id}
        {...expense}
        removeExpense={removeExpense}
      />
    ));
    return expenseItems;
  }

  return (
    <section className="my-4">
      <div className="text-start">
        <h2>Prior Expenses</h2>
      </div>
      <ul className="list-group">
        {expenses.length > 0 ? renderExpenses() : <p>You have no prior expenses</p>}
      </ul>
    </section>
  );
}

export default ExpensesList;
