import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import AddExpensesForm from '../components/AddExpensesForm';
import ExpensesList from '../components/ExpensesList';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (title, date, amount) => {
    setExpenses([...expenses, { id: uuid(), title, date, amount }]);
  }

  return (
    <section className="row my-5">
      <div className="text-center">
        <h2 className="display-2">Expenses</h2>
      </div>
      <AddExpensesForm addExpense={addExpense} />
      <ExpensesList expenses={expenses} />
    </section>
  );
};

export default Expenses;
