import AddExpensesForm from '../components/AddExpensesForm';
import ExpensesList from '../components/ExpensesList';

const Expenses = ({
  selectedMonth,
  expenses,
  setExpenses,
  filteredExpenses,
}) => {
  const token = process.env.REACT_APP_MOSTASH_API_KEY;
  const baseURL = process.env.REACT_APP_MOSTASH_BASE_URL;
  const headers = {
    Stash: token,
    'Content-Type': 'application/json',
  };

  const addExpense = async (newExpense) => {
    const url = `${baseURL}/items.json?kind=expense`;
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(newExpense),
    };

    try {
      const response = await fetch(url, requestOptions);
      const newExpenseData = await response.json();
      setExpenses([...expenses, newExpenseData]);
    } catch {
      alert('Error adding expense. Please try again later.');
    }
  };

  const removeExpense = async (id) => {
    const url = `${baseURL}/items/${id}.json`;
    const requestOptions = { method: 'DELETE', headers };

    try {
      await fetch(url, requestOptions);
      // Remove expense item from state
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch {
      alert('Error deleting expense. Please try again later.');
    }
  };

  return (
    <section className="row my-5">
      <div className="text-center">
        <h2 className="display-2">Expenses</h2>
      </div>
      <AddExpensesForm addExpense={addExpense} />
      <ExpensesList
        expenses={expenses}
        removeExpense={removeExpense}
        selectedMonth={selectedMonth}
        filteredExpenses={filteredExpenses}
      />
    </section>
  );
};

export default Expenses;
