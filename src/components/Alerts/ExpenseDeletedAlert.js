import { getUKFormattedEuros, getUKFormattedDate } from '../../utils/helpers';
import Alert from './components/Alert';

const ExpenseDeletedAlert = ({ errorOccurred, closeCallback, title, date, amount }) => {
  return (
    <Alert color={errorOccurred ? 'danger' : 'success'} heading={errorOccurred ? 'Error deleting expense' : 'Expense deleted'} closeCallback={closeCallback}>
      {errorOccurred
        ? 'The expense could not be deleted. Please try again.'
        : `The expense "${title}" from ${getUKFormattedDate(date)} totaling
        ${getUKFormattedEuros(amount)} has been deleted.`}
    </Alert>
  );
};

export default ExpenseDeletedAlert;
