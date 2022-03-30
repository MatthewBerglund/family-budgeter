const Expense = () => {
  return (
    <li>
      <h5 className="d-flex justify-content-between align-items-center">
        <span>22.03.22</span>
        <span>Tacos</span>
        <span>- €13.00</span>
        <button className="btn btn-danger mx-5">Delete</button>
      </h5>
    </li >
  );
}

export default Expense;
