import { useEffect, useState } from 'react';
import { getUKFormattedEuros } from '../utils/helpers';

function Summary({ currentMonth, selectedMonth, filteredExpenses }) {
  const [totalBudget, setTotalBudget] = useState(7777 * 100);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [spendingRateDeviation, setSpendingRateDeviation] = useState(0);

  // Calculate total expenses
  useEffect(() => {
    const expenseSum = filteredExpenses
      .map(expense => expense.amount)
      .reduce((sum, curr) => {
        return sum + curr;
      }, 0);
    setTotalExpenses(expenseSum);
  }, [filteredExpenses]);

  // Calculate spending rate deviation
  useEffect(() => {
    const date = new Date(selectedMonth);

    // Get last day of selected month
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    // Set day equal to today's date or last day of the month
    const dayOfMonth =
      selectedMonth === currentMonth ? new Date().getDate() : daysInMonth;

    const targetRate = totalBudget / daysInMonth;
    const actualRate = totalExpenses / dayOfMonth;
    const deviation = (actualRate - targetRate) / targetRate;
    setSpendingRateDeviation(deviation);
  }, [currentMonth, selectedMonth, totalBudget, totalExpenses]);

  return (
    <div className="card h-100">
      <h3 className="card-header">
        Summary for <span className="fw-bold">{selectedMonth}</span>
      </h3>
      <div className="card-body container d-flex flex-column justify-content-between">
        <h4 className="fw-light row">
          <span className="col-6 col-md-4 col-lg-6 col-xl-5">
            Starting budget:
          </span>
          <span className="col-4 fw-bold text-end">{` ${getUKFormattedEuros(
            totalBudget
          )}`}</span>
          <div className="col-3"></div>
        </h4>
        <h4 className="fw-light row">
          <span className="col-6 col-md-4 col-lg-6 col-xl-5">Money spent:</span>
          <span className="col-4 fw-bold text-end">{` ${getUKFormattedEuros(
            totalExpenses
          )}`}</span>
          <div className="col-3"></div>
        </h4>
        <h4 className="fw-light row">
          <span className="col-6 col-md-4 col-lg-6 col-xl-5">
            Remaining budget:
          </span>
          <span
            className={`col-4 fw-bold text-end ${
              spendingRateDeviation >= 0.15
                ? 'text-danger'
                : spendingRateDeviation > 0
                ? 'text-warning'
                : 'text-success'
            }`}
          >{` ${getUKFormattedEuros(totalBudget - totalExpenses)}`}</span>
          <div className="col-3"></div>
        </h4>
      </div>
    </div>
  );
}

export default Summary;
