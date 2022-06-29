import { getUniqueMonthsFromExpenses } from '../utils/helpers';
import { useGlobalFunctions, useGlobalState } from '../utils/hooks';

const MonthSelector = () => {
  const { expenses, selectedMonth } = useGlobalState();
  const { changeMonthView } = useGlobalFunctions();

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
