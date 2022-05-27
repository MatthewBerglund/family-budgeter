import { getUKFormattedEuros, getUKFormattedDate } from '../../utils/helpers';

const ExpenseDeletedAlert = ({
  expenseWasDeleted,
  setShowExpenseDeletedAlert,
  title,
  date,
  amount,
}) => {
  return (
    <div
      role="alert"
      className={`alert ${
        expenseWasDeleted ? 'alert-success' : 'alert-danger'
      } alert-dismissible fade show position-fixed top-0 end-0`}
    >
      <h4 className="alert-heading">
        {expenseWasDeleted ? 'Expense deleted' : 'Error deleting expense'}
      </h4>
      <p>
        {expenseWasDeleted
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
        onClick={() => setShowExpenseDeletedAlert(false)}
      />
    </div>
  );
};

export default ExpenseDeletedAlert;
