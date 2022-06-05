import Alert from './components/Alert';

const ExpenseAddedAlert = ({ errorOccurred, closeCallback }) => {
  return (
    <Alert
      color={errorOccurred ? 'danger' : 'success'}
      heading={errorOccurred ? 'Error adding expense' : 'Expense added'}
      closeCallback={closeCallback}
    >
      {errorOccurred
        ? 'The expense could not be added. Please try again.'
        : 'Your expense has been successfully added.'}
    </Alert>
  );
};

export default ExpenseAddedAlert;
