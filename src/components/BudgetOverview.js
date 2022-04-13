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
      <div className="card-body d-flex flex-column justify-content-between">
        <h4 className="fw-light">
          Starting budget:
          <span className="text-primary fw-bold">{` ${getUKFormattedEuros(
            totalBudget
          )}`}</span>
        </h4>
        <h4 className="fw-light">
          Money spent:
          <span className="text-danger fw-bold">{` ${getUKFormattedEuros(
            totalExpenses
          )}`}</span>
        </h4>
        <h4 className="fw-light">
          Remaining budget:
          <span className="text-success fw-bold">{` ${getUKFormattedEuros(
            totalSavings
          )}`}</span>{' '}
        </h4>
      </div>
    </div>
  );
}

export default BudgetOverview;
