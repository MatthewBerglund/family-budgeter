import { useEffect, useState } from 'react';
import { getUKFormattedEuros } from '../utils/helpers';

function Summary({ selectedMonth, filteredExpenses }) {
  const [totalBudget, setTotalBudget] = useState(7777 * 100);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    // Calculate total expenses
    const expenseSum = filteredExpenses
      .map(expense => expense.amount)
      .reduce((sum, curr) => {
        return sum + curr;
      }, 0);
    setTotalExpenses(expenseSum);
  }, [filteredExpenses]);

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
          <span className="col-4 text-warning fw-bold text-end">{` ${getUKFormattedEuros(
            totalBudget - totalExpenses
          )}`}</span>
          <div className="col-3"></div>
        </h4>
      </div>
    </div>
  );
}

export default Summary;
