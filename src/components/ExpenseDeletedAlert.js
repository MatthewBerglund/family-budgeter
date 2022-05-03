import { getUKFormattedEuros, getUKFormattedDate } from '../utils/helpers';

const ExpenseDeletedAlert = ({
  expenseDeleted,
  setExpenseDeleted,
  title,
  date,
  amount,
}) => {
  return (
    <div
      role="alert"
      className={`alert ${
        expenseDeleted ? 'alert-success' : 'alert-danger'
      } alert-dismissible fade show position-fixed top-0 end-0`}
    >
      <h4 className="alert-heading">
        {expenseDeleted ? 'Expense deleted' : 'Error deleting expense'}
      </h4>
      <p>
        {expenseDeleted
          ? `The expense "${title}" from ${getUKFormattedDate(
              date
            )} totaling ${getUKFormattedEuros(amount)} has been deleted.`
          : 'The expense could not be deleted. Please try again.'}
      </p>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={() => setExpenseDeleted(undefined)}
      />
    </div>
  );
};

export default ExpenseDeletedAlert;
