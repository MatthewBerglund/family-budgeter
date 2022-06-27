import { useContext } from 'react';

import { GlobalContext } from '../../GlobalState';
import { getUKFormattedEuros, getUKFormattedDate } from '../../utils/helpers';
import Alert from './components/Alert';

const ExpenseDeletedAlert = () => {
  const { expenseToDelete, didErrorOccur, closeAlert } = useContext(GlobalContext);
  const { title, date, amount } = expenseToDelete;

  return (
    <Alert
      color={didErrorOccur ? 'danger' : 'success'}
      heading={didErrorOccur ? 'Error deleting expense' : 'Expense deleted'}
      closeCallback={closeAlert}
    >
      {didErrorOccur
        ? 'The expense could not be deleted. Please try again.'
        : `The expense "${title}" from ${getUKFormattedDate(date)} totaling
        ${getUKFormattedEuros(amount)} has been deleted.`}
    </Alert>
  );
};

export default ExpenseDeletedAlert;
