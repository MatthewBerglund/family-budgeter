import Alert from './components/Alert';

const ExpenseAddedAlert = ({ expenseWasAdded, setShowExpenseAddedAlert }) => {
  return (
    <Alert
      color={expenseWasAdded ? 'success' : 'danger'}
      heading={expenseWasAdded ? 'Expense added' : 'Error adding expense'}
      closeCallback={() => setShowExpenseAddedAlert(false)}
    >
      {expenseWasAdded
        ? 'Your expense has been successfully added.'
        : 'The expense could not be added. Please try again.'}
    </Alert>
  );
};

export default ExpenseAddedAlert;
