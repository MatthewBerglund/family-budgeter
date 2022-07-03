import Alert from './components/Alert';
import { useGlobalState, useGlobalFunctions } from '../../store/hooks';

const ExpenseAddedAlert = () => {
  const { didErrorOccur } = useGlobalState();
  const { closeAlert } = useGlobalFunctions();

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
