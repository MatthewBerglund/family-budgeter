const ExpenseAddedAlert = ({ expenseWasAdded, setShowExpenseAddedAlert }) => {
  return (
    <div
      role="alert"
      className={`alert ${
        expenseWasAdded ? 'alert-success' : 'alert-danger'
      } alert-dismissible fade show position-fixed top-0 end-0`}
    >
      <h4 className="alert-heading">
        {expenseWasAdded ? 'Expense added' : 'Error adding expense'}
      </h4>
      <p>
        {expenseWasAdded
          ? 'Your expense has been successfully added.'
          : 'Your expense could not be added. Please try again.'}
      </p>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={() => setShowExpenseAddedAlert(false)}
      />
    </div>
  );
};

export default ExpenseAddedAlert;
