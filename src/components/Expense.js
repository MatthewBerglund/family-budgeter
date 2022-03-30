const Expense = ({ expense, removeExpense }) => {
  return (
    <li>
      <h5 className="d-flex justify-content-between align-items-center">
        <span>{expense.date}</span>
        <span>{expense.title}</span>
        <span>- €{expense.amount}</span>
        <button
          className="btn btn-danger mx-5"
          onClick={() => removeExpense(expense.id)}
        >
          Delete
        </button>
      </h5>
    </li >
  );
}

export default Expense;
