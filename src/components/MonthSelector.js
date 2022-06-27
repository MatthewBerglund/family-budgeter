import { useContext } from 'react';

import { GlobalContext } from '../GlobalState';
import { getUniqueMonthsFromExpenses } from '../utils/helpers';

const MonthSelector = () => {
  const { expenses, selectedMonth, changeMonthView } = useContext(GlobalContext);

  const months = getUniqueMonthsFromExpenses(expenses);

  return (
    <select
      className="form-select"
      aria-label="Select a month"
      value={selectedMonth}
      onChange={e => {
        changeMonthView(e.target.value);
      }}
    >
      {months.map((month, i) => (
        <option key={i} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthSelector;
