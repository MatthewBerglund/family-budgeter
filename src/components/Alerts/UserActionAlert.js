import ExpenseAddedAlert from './ExpenseAddedAlert';
import ExpenseDeletedAlert from './ExpenseDeletedAlert';

const UserActionAlert = ({
  userAction,
  errorOccurred,
  closeCallback,
  expense,
}) => {
  const baseProps = { errorOccurred, closeCallback };

  switch (userAction) {
    case 'add_expense':
      return <ExpenseAddedAlert {...baseProps} />;
    case 'delete_expense':
      return <ExpenseDeletedAlert {...baseProps} {...expense} />;
    default:
      return null;
  }
};

export default UserActionAlert;
