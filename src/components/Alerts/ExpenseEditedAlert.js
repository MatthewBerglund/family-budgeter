import Alert from './components/Alert';

import { useGlobalFunctions, useGlobalState } from '../../store/hooks';

const ExpenseEditedAlert = () => {
  const { didErrorOccur } = useGlobalState();
  const { closeAlert } = useGlobalFunctions();

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
