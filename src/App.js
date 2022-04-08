import { useState, useEffect } from 'react';
import { getUKFormattedDate } from './utils/helpers';

import Summary from './views/Summary';
import Expenses from './views/Expenses';
import MonthSelector from './components/MonthSelector';

function App() {
  const token = process.env.REACT_APP_MOSTASH_API_KEY;
  const baseURL = process.env.REACT_APP_MOSTASH_BASE_URL;

  const currentMonth = getUKFormattedDate(Date.now(), {
    year: '2-digit',
    month: 'long',
  });
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  useEffect(() => {
    const fetchExpenses = async () => {
      const url = `${baseURL}/items.json?stash=${token}&kind=expense`;

      try {
        const response = await fetch(url);
        const expenseData = await response.json();
        expenseData.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        setExpenses(expenseData);
      } catch {
        alert('Error loading expenses. Please try again later.');
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    const expensesToRender = expenses.filter((expense) => {
      let formattedExpenseDate = getUKFormattedDate(new Date(expense.date), {
        year: '2-digit',
        month: 'long',
      });
      return selectedMonth === formattedExpenseDate;
    });

    if (selectedMonth !== 'the beginning of time') {
      setFilteredExpenses(expensesToRender);
    } else setFilteredExpenses(expenses);
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
        filteredExpenses={filteredExpenses}
        selectedMonth={selectedMonth}
      />
      <Expenses
        expenses={expenses}
        setExpenses={setExpenses}
        filteredExpenses={filteredExpenses}
      />
    </main>
  );
}

export default App;
