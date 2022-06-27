import { useContext } from 'react';
import { GlobalContext } from '../GlobalState';
import { getUniqueMonthsFromExpenses } from '../utils/helpers';

const MonthSelector = () => {
  const { globalState, changeMonthView } = useContext(GlobalContext);
  const { expenses, selectedMonth } = globalState;

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
