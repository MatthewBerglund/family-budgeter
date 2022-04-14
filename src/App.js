import { useState, useEffect } from 'react';
import { getUKFormattedDate, getCurrentMonth } from './utils/helpers';

import Summary from './views/Summary';
import AddExpenses from './views/AddExpenses';
import MonthSelector from './components/MonthSelector';

const token = process.env.REACT_APP_MOSTASH_API_KEY;
const baseURL = process.env.REACT_APP_MOSTASH_BASE_URL;

function App() {
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
    const expensesToRender = expenses.filter(expense => {
      let formattedExpenseDate = getUKFormattedDate(new Date(expense.date), {
        year: 'numeric',
        month: 'long',
      });
      return selectedMonth === formattedExpenseDate;
    });
    setFilteredExpenses(expensesToRender);
  }, [expenses, selectedMonth]);

  return (
    <>
      <header className="navbar bg-dark bg-opacity-10">
        <div className="container">
          <div className="col-md-9">
            <h1 className="display-1 text-dark">Matt's Budget</h1>
          </div>
          <div className="col-md-3">
            <MonthSelector
              expenses={expenses}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
          </div>
        </div>
      </header>
      <main className="container py-5">
        <div className="row g-5">
          <section className="col-lg-6">
            <Summary selectedMonth={selectedMonth} />
          </section>
          <section className="col-lg-6">
            <AddExpenses
              expenses={expenses}
              setExpenses={setExpenses}
              filteredExpenses={filteredExpenses}
              setSelectedMonth={setSelectedMonth}
              currentMonth={currentMonth}
            />
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
