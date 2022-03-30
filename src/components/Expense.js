const Expense = ({ title, date, amount }) => {
  return (
    <li>
      <h5 className="d-flex justify-content-between align-items-center">
        <span>{date}</span>
        <span>{title}</span>
        <span>- {amount}</span>
        <button className="btn btn-danger mx-5">Delete</button>
      </h5>
    </li >
  );
}

export default Expense;
