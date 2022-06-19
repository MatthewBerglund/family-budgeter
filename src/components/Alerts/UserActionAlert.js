import ExpenseAddedAlert from './ExpenseAddedAlert';
import ExpenseDeletedAlert from './ExpenseDeletedAlert';
import ExpenseEditedAlert from './ExpenseEditedAlert';

/**
 * A dynamic alert component that displays feedback information based on a `userAction`.
 *
 * @param userAction {string} an action performed by the user
 * Available actions: 'add_expense' | 'delete_expense' | 'edit_expense'
 * @param errorOccurred {bool} `true` if an error was caught when the user action was performed, otherwise `false`
 * @param closeCallback {function} to be called when the close ('X') or 'Cancel' buttons are clicked
 * @param expense {object} information about the expense on which the user action was performed (title, amount, date, id)
 */

const UserActionAlert = ({ userAction, errorOccurred, closeCallback, expense }) => {
  const baseProps = { errorOccurred, closeCallback };

  switch (userAction) {
    case 'add_expense':
      // required props: errorOccurred, closeCallback
      return <ExpenseAddedAlert {...baseProps} />;
    case 'delete_expense':
      // required props: errorOccurred, closeCallback, expense
      // takes `expense` prop to provide feedback about which expense was deleted
      return <ExpenseDeletedAlert {...baseProps} {...expense} />;
    case 'edit_expense':
      // required props: errorOccurred, closeCallback
      return <ExpenseEditedAlert {...baseProps} />;
    default:
      return null;
  }
};

export default UserActionAlert;
