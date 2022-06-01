import { getUKFormattedEuros, getUKFormattedDate } from '../../utils/helpers';
import Alert from './components/Alert';

const ExpenseDeletedAlert = ({
  expenseWasDeleted,
  setActiveAlert,
  title,
  date,
  amount,
}) => {
  return (
    <Alert
      color={expenseWasDeleted ? 'success' : 'danger'}
      heading={expenseWasDeleted ? 'Expense deleted' : 'Error deleting expense'}
      closeCallback={() => setActiveAlert(null)}
    >
      {expenseWasDeleted
        ? `The expense "${title}" from ${getUKFormattedDate(date)} totaling
      ${getUKFormattedEuros(amount)} has been deleted.`
        : 'The expense could not be deleted. Please try again.'}
    </Alert>
  );
};

export default ExpenseDeletedAlert;
