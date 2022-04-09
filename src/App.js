import { useState, useEffect } from 'react';
import { getUKFormattedDate, getCurrentMonth } from './utils/helpers';

import Summary from './views/Summary';
import Expenses from './views/Expenses';
import MonthSelector from './components/MonthSelector';

function App() {
  const token = process.env.REACT_APP_MOSTASH_API_KEY;
  const baseURL = process.env.REACT_APP_MOSTASH_BASE_URL;
  const currentMonth = getCurrentMonth();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  useEffect(() => {
    const fetchExpenses = async () => {
      const url = `${baseURL}/items.json?stash=${token}&kind=expense`;

      try {
        const response = await fetch(url);
        const expenseData = await response.json();
        const sortedData = expenseData.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        setExpenses(sortedData);
      } catch {
        alert('Error loading expenses. Please try again later.');
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    const expensesToRender = expenses.filter((expense) => {
      let formattedExpenseDate = getUKFormattedDate(new Date(expense.date), {
        year: 'numeric',
        month: 'long',
      });
      return selectedMonth === formattedExpenseDate;
    });
    setFilteredExpenses(expensesToRender);
  }, [expenses, selectedMonth]);

  return (
    <main className="container-md">
      <header className="row text-center my-5">
        <h1 className="display-1 text-primary">Matt's Budget</h1>
      </header>
      <MonthSelector
        expenses={expenses}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <Summary
        selectedMonth={selectedMonth}
      />
      <Expenses
        expenses={expenses}
        setExpenses={setExpenses}
        filteredExpenses={filteredExpenses}
        setSelectedMonth={setSelectedMonth}
        currentMonth={currentMonth}
      />
    </main>
  );
}

export default App;
