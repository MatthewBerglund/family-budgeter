import { useEffect, useState } from 'react';

import { getCurrentMonth, getFormattedAmount } from '../utils/helpers';

const Summary = ({ expenses, month }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [spendingRateDeviation, setSpendingRateDeviation] = useState(0);

  // Set total budget on initial render
  // Needed temporarily to avoid compile warning about unused variables
  useEffect(() => {
    setTotalBudget(7777 * 100);
  }, []);

  useEffect(() => {
    updateExpenseTotal();
    updateSpendingRateDeviation();
  });

  const updateExpenseTotal = () => {
    const total = expenses
      .map(expense => expense.amount)
      .reduce((sum, curr) => sum + curr, 0);
    setExpenseTotal(total);
  };

  const updateSpendingRateDeviation = () => {
    const date = new Date(month);

    // Get last day of selected month
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    // If the summary month is the current month, set day equal to today's date
    // otherwise set it to the last day of the month
    const dayOfMonth = (month === getCurrentMonth()) ? new Date().getDate() : daysInMonth;

    const targetRate = totalBudget / daysInMonth;
    const actualRate = expenseTotal / dayOfMonth;
    const deviation = (actualRate - targetRate) / targetRate;
    setSpendingRateDeviation(deviation);
  };

  return (
    <div className="card h-100">
      <h3 className="card-header">
        Summary for <span className="fw-bold">{month}</span>
      </h3>
      <div className="card-body container d-flex flex-column justify-content-around">
        <h4 className="fw-light row">
          <span className="col-6 col-md-4 col-lg-6 col-xl-5">
            Starting budget:
          </span>
          <span
            className="col-4 fw-bold text-end"
            data-cy="total-budget"
          >{`${getFormattedAmount(totalBudget, 'en-GB', 'EUR')}`}</span>
          <div className="col-3"></div>
        </h4>
        <h4 className="fw-light row">
          <span className="col-6 col-md-4 col-lg-6 col-xl-5">Money spent:</span>
          <span
            className="col-4 fw-bold text-end"
            data-cy="total-expenses"
          >{`${getFormattedAmount(expenseTotal, 'en-GB', 'EUR')}`}</span>
          <div className="col-3"></div>
        </h4>
        <h4 className="fw-light row">
          <span className="col-6 col-md-4 col-lg-6 col-xl-5">
            Remaining budget:
          </span>
          <span
            className={`col-4 fw-bold text-end ${spendingRateDeviation >= 0.1
              ? 'text-danger'
              : spendingRateDeviation > 0
                ? 'text-warning'
                : 'text-success'
              }`}
            data-cy="remaining-budget"
          >{`${getFormattedAmount(totalBudget - expenseTotal, 'en-GB', 'EUR')}`}</span>
          <div className="col-3"></div>
        </h4>
      </div>
    </div>
  );
};

export default Summary;
