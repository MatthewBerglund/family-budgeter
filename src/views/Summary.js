import { useState } from 'react';
import { getUKFormattedEuros } from '../utils/helpers';

const Summary = ({ selectedMonth }) => {
  const dummyTotBudget = 7777;
  const dummyTotExpenses = 4444;
  const dummyTotSavings = 3333;

  const [totalBudget, setTotalBudget] = useState(dummyTotBudget);
  const [totalExpenses, setTotalExpenses] = useState(dummyTotExpenses);
  const [totalSavings, setTotalSavings] = useState(dummyTotSavings);

  return (
    <section className="my-5">
      <div className="card">
        <h3 className="text-center card-header">Summary</h3>
        <div className="card-body">
          <h4 className="fw-light">
            Your monthly budget is
            <span className="text-primary fw-bold">{` ${getUKFormattedEuros(
              totalBudget
            )}`}</span>
          </h4>
          <h4 className="fw-light">
            You have spent
            <span className="text-danger fw-bold">{` ${getUKFormattedEuros(
              totalExpenses
            )}`}</span>
          </h4>
          <h4 className="fw-light">
            This leaves you with
            <span className="text-success fw-bold">{` ${getUKFormattedEuros(
              totalSavings
            )}`}</span>{' '}
            <span>{selectedMonth && `until the end of ${selectedMonth}`}</span>
          </h4>
        </div>
      </div>
    </section>
  );
};

export default Summary;
