import { getUKFormattedDate, getUKFormattedEuros } from '../utils/helpers';

const Expense = ({ title, amount, date, id, removeExpense }) => {
  return (
    <li className="container list-group-item">
      <div className="row align-items-center">
        <div className="col fs-5">{getUKFormattedDate(date)}</div>
        <div className="col-6 fs-5">{title}</div>
        <div className="col fs-5 text-end">- {getUKFormattedEuros(amount)}</div>
        <div className="col text-end">
          <button className="btn btn-danger" onClick={() => removeExpense(id)}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default Expense;
