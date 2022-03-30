import Expense from "./Expense";

const ExpensesList = () => {
  return (
    <section className="my-4">
      <div className="text-start">
        <h2>Prior Expenses</h2>
      </div>
      <ul className="list-unstyled">
        <Expense />
        <Expense />
        <Expense />
        <Expense />
        <Expense />
      </ul>
    </section>
  );
}

export default ExpensesList;
