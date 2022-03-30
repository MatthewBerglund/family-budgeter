import Expense from "./Expense";

const ExpensesList = () => {
  return (
    <section className="my-4">
      <div className="text-center">
        <h2>Prior Expenses</h2>
      </div>
      <ul>
        <Expense />
      </ul>
    </section>
  );
}

export default ExpensesList;
