import { useState } from 'react';
import { getUKFormattedEuros } from '../utils/helpers';

function BudgetOverview({ selectedMonth }) {
  const dummyTotBudget = 7777;
  const dummyTotExpenses = 4444;
  const dummyTotSavings = 3333;

  const [totalBudget, setTotalBudget] = useState(dummyTotBudget);
  const [totalExpenses, setTotalExpenses] = useState(dummyTotExpenses);
  const [totalSavings, setTotalSavings] = useState(dummyTotSavings);

  return (
    <div className="card h-100">
      <h3 className="card-header">Summary for {selectedMonth}</h3>
      <div className="card-body container d-flex flex-column justify-content-between">
        <h4 className="fw-light row">
          <span className="col">Starting budget:</span>
          <span className="text-success fw-bold col">{` ${getUKFormattedEuros(
            totalBudget
          )}`}</span>
        </h4>
        <h4 className="fw-light row">
          <span className="col">Money spent:</span>
          <span className="text-danger fw-bold col">{` ${getUKFormattedEuros(
            totalExpenses
          )}`}</span>
        </h4>
        <h4 className="fw-light row">
          <span className="col">Remaining budget:</span>
          <span className="text-warning fw-bold col">{` ${getUKFormattedEuros(
            totalSavings
          )}`}</span>{' '}
        </h4>
      </div>
    </div>
  );
}

export default BudgetOverview;
