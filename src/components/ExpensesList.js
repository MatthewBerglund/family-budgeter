import Expense from "./Expense";

const ExpensesList = ({ expenses }) => {
  return (
    <section className="my-4">
      <div className="text-start">
        <h2>Prior Expenses</h2>
      </div>
      <ul className="list-unstyled">
        {expenses.map(expense => {
          return (
            <Expense
              key={expense.id}
              title={expense.title}
              date={expense.date}
              amount={expense.amount}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default ExpensesList;
