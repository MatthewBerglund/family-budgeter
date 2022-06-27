import { useContext } from 'react';

import { GlobalContext } from '../../GlobalState';
import Alert from './components/Alert';

const ExpenseAddedAlert = () => {
  const { didErrorOccur, closeAlert } = useContext(GlobalContext);

  return (
    <Alert
      color={didErrorOccur ? 'danger' : 'success'}
      heading={didErrorOccur ? 'Error adding expense' : 'Expense added'}
      closeCallback={closeAlert}
    >
      {didErrorOccur
        ? 'The expense could not be added. Please try again.'
        : 'Your expense has been successfully added.'}
    </Alert>
  );
};

export default ExpenseAddedAlert;
