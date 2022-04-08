import { useState } from 'react';
import { getUKFormattedEuros } from '../components/helpers';

const Summary = () => {
  const dummyTotBudget = 7777;
  const dummyTotExpenses = 4444;
  const dummyTotSavings = 3333;

  const [totalBudget, setTotalBudget] = useState(dummyTotBudget);
  const [totalExpenses, setTotalExpenses] = useState(dummyTotExpenses);
  const [totalSavings, setTotalSavings] = useState(dummyTotSavings);

  return (
    <section className="row my-5">
      <div className="text-center">
        <h2 className="display-2">Summary</h2>
      </div>
      <h3 className="fw-light">
        Your monthly budget is
        <span className="text-primary">{` ${getUKFormattedEuros(totalBudget)}`}</span>
      </h3>
      <h3 className="fw-light">
        You have spent
        <span className="text-danger">{` ${getUKFormattedEuros(totalExpenses)}`}</span>
      </h3>
      <h3 className="fw-light">
        This leaves you with
        <span className="text-success">{` ${getUKFormattedEuros(totalSavings)}`}</span> until
        <span>{' 31.03.22'}</span>
      </h3>
    </section>
  );
};

export default Summary;
