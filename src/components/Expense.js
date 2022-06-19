import { getUKFormattedDate, getUKFormattedEuros } from '../utils/helpers';

const Expense = ({ expense, setConfirmDeleteModalIsOpen, setEditExpenseModalIsOpen, setLastDeleted, setExpenseToEdit }) => {
  const { title, amount, date } = expense;

  return (
    <li className="container gy-5 px-0 list-group-item">
      <div className="row align-items-center">
        <div className="col-8 col-lg-10">
          <div className="row align-items-center">
            <div className="col-lg-2 fs-5 fw-bold text-nowrap">{getUKFormattedDate(date)}</div>
            <div className="col-lg-8 fs-5">{title}</div>
            <div className="col-lg-2 fs-5 text-lg-end text-nowrap pe-5">- {getUKFormattedEuros(amount)}</div>
          </div>
        </div>
        <div className="col-2 col-lg-1 d-flex ps-lg-3">
          <button
            className="btn btn-outline-secondary flex-fill"
            onClick={() => {
              setEditExpenseModalIsOpen(true);
              setExpenseToEdit(expense);
            }}
          >
            Edit
          </button>
        </div>
        <div className="col-2 col-lg-1 d-flex justify-content-center">
          <button
            className="btn btn-danger flex-fill"
            data-cy="deleteButton"
            onClick={() => {
              setConfirmDeleteModalIsOpen(true);
              setLastDeleted(expense);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default Expense;
