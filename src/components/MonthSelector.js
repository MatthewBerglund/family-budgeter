import { getUniqueMonths } from '../utils/helpers';

const MonthSelector = ({ expenses, selectedMonth, setSelectedMonth }) => {
  const months = getUniqueMonths(expenses);

  return (
    <select
      className="form-select"
      aria-label="Select a month"
      value={selectedMonth}
      onChange={evt => {
        setSelectedMonth(evt.target.value);
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
