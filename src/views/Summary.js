import { useState } from 'react';
import BudgetOverview from '../components/BudgetOverview';

const Summary = ({ selectedMonth }) => {
  return (
    <section className="my-5">
      <BudgetOverview selectedMonth={selectedMonth} />
    </section>
  );
};

export default Summary;
