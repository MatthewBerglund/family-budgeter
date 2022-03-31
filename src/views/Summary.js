import { useState } from 'react';

const Summary = () => {
  const dummyTotBudget = 7777;
  const dummyTotExpenses = 4444;
  const dummyTotSavings = 3333;

  const [totBudget, setTotBudget] = useState(dummyTotBudget);
  const [totExpenses, setTotExpenses] = useState(dummyTotExpenses);
  const [totSavings, setTotSavings] = useState(dummyTotSavings);

  return (
    <section className="row my-5">
      <div className="text-center">
        <h2 className="display-2">Summary</h2>
      </div>
      <div className="">
        <h3 className="fw-light">
          Your monthly budget is
          <span className="text-primary">{` ${totBudget}€`}</span>
        </h3>
        <h3 className="fw-light">
          You have spent
          <span className="text-danger">{` ${totExpenses}€`}</span>
        </h3>
        <h3 className="fw-light">
          This leaves you with
          <span className="text-success">{` ${totSavings}€`}</span> until
          <span>{' 31.03.22'}</span>
        </h3>
      </div>
    </section>
  );
};

export default Summary;
