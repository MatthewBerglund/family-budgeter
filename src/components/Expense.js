const Expense = ({ expense, removeExpense }) => {
  return (
    <li className="container list-group-item">
      <div className="row align-items-center">
        <div className="col fs-5">
          {expense.date}
        </div>
        <div className="col-6 fs-5">
          {expense.title}
        </div>
        <div className="col fs-5 text-end">
          - €{expense.amount}
        </div>
        <div className="col text-end">
          <button
            className="btn btn-danger"
            onClick={() => removeExpense(expense.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </li >
  );
}

export default Expense;
