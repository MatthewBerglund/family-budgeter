const ExpenseAddedAlert = ({ expenseAdded, setExpenseAdded }) => {
  return (
    <div
      role="alert"
      style={{ zIndex: 1 }}
      className={`alert ${
        expenseAdded ? 'alert-success' : 'alert-danger'
      } alert-dismissible position-fixed bottom-0 end-0`}
    >
      <h4 className="alert-heading">
        {expenseAdded ? 'Expense added' : 'Expense not added'}
      </h4>
      <p>
        {expenseAdded
          ? 'Your expense has been successfully added.'
          : 'Your expense could not be added. Please try again.'}
      </p>
      <button
        type="button"
        className="btn-close"
        onClick={() => setExpenseAdded(undefined)}
      />
    </div>
  );
};

export default ExpenseAddedAlert;
