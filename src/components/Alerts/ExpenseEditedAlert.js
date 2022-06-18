import Alert from './components/Alert';

const ExpenseEditedAlert = ({ errorOccurred, closeCallback }) => {
  return (
    <Alert
      color={errorOccurred ? 'danger' : 'success'}
      heading={errorOccurred ? 'Error editing expense' : 'Expense edited'}
      closeCallback={closeCallback}
    >
      {errorOccurred
        ? 'The new expense information could not be saved. Please try again.'
        : 'The new expense information has been successfully saved.'}
    </Alert>
  );
};

export default ExpenseEditedAlert;
