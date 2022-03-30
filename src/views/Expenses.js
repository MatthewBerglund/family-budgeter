import AddExpensesForm from '../components/AddExpensesForm';
import ExpensesList from '../components/ExpensesList';

const Expenses = () => {
  return (
    <section className="row my-5">
      <div className="text-center">
        <h2 className="display-2">Expenses</h2>
      </div>
      <AddExpensesForm />
      <ExpensesList />
    </section>
  );
};

export default Expenses;
