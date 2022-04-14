import { getUKFormattedDate, getUKFormattedEuros } from '../utils/helpers';

const Expense = ({ title, amount, date, id, removeExpense }) => {
  return (
    <li className="container gy-5 px-0 list-group-item">
      <div className="row align-items-center">
        <div className="col-9 col-lg-10">
          <div className="row align-items-center">
            <div className="col-lg-2 fs-5 fw-bold text-nowrap">
              {getUKFormattedDate(date)}
            </div>
            <div className="col-lg-8 fs-5">{title}</div>
            <div className="col-lg-2 fs-5 text-lg-end text-nowrap">
              - {getUKFormattedEuros(amount)}
            </div>
          </div>
        </div>
        <div className="col-3 col-lg-2 text-end">
          <button
            className="btn btn-danger"
            onClick={() => removeExpense({ title, amount, date, id })}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default Expense;
