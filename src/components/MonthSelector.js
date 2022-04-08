import { getUniqueMonths } from '../utils/helpers';

const MonthSelector = ({ expenses, selectedMonth, setSelectedMonth }) => {
  const months = getUniqueMonths(expenses);
  return (
    <form>
      <select
        className="form-select"
        aria-label="Select a month"
        value={selectedMonth}
        onChange={(evt) => {
          setSelectedMonth(evt.target.value);
        }}
      >
        <option key="the beginning of time" value="the beginning of time">
          the beginning of time
        </option>
        {months.map((month, i) => (
          <option key={i} value={month}>
            {month}
          </option>
        ))}
      </select>
    </form>
  );
};

export default MonthSelector;
