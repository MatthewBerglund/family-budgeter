const Expense = ({ expense, removeExpense }) => {
  return (
    <li className="container list-group-item">
      <div className="row">
        <div className="col">
          <span className="fs-5">{expense.date}</span>
        </div>
        <div className="col-6">
          <span className="fs-5">{expense.title}</span>
        </div>
        <div className="col text-end">
          <span className="fs-5">- €{expense.amount}</span>
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
