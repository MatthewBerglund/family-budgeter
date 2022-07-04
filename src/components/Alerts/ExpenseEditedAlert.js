import { useContext } from 'react';

import Alert from './components/Alert';

import { GlobalContext } from '../../store/GlobalState';

const ExpenseEditedAlert = () => {
  const { didErrorOccur, closeAlert } = useContext(GlobalContext);

  return (
    <Alert
      color={didErrorOccur ? 'danger' : 'success'}
      heading={didErrorOccur ? 'Error editing expense' : 'Expense edited'}
      closeCallback={closeAlert}
    >
      {didErrorOccur
        ? 'The new expense information could not be saved. Please try again.'
        : 'The new expense information has been successfully saved.'}
    </Alert>
  );
};

export default ExpenseEditedAlert;
