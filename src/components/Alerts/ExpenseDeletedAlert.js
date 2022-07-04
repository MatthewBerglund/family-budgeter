import { useContext } from 'react';

import Alert from './components/Alert';

import { getUKFormattedEuros, getUKFormattedDate } from '../../utils/helpers';
import { GlobalContext } from '../../store/GlobalState';

const ExpenseDeletedAlert = () => {
  const { didErrorOccur, expenseToDelete, closeAlert } = useContext(GlobalContext);

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
