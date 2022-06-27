import { useContext } from 'react';
import { GlobalContext } from '../../GlobalState';

import ExpenseAddedAlert from './ExpenseAddedAlert';
import ExpenseDeletedAlert from './ExpenseDeletedAlert';
import ExpenseEditedAlert from './ExpenseEditedAlert';

/**
 * A dynamic alert component that displays feedback information based on a `userAction`.
 *
 * @param userAction {string} an action performed by the user
 * Available actions: 'add_expense' | 'delete_expense' | 'edit_expense'
 * @param didErrorOccur {bool} `true` if an error was caught when the user action was performed, otherwise `false`
 * @param closeAlert {function} to be called when the close ('X') or 'Cancel' buttons are clicked
 * @param expense {object} information about the expense on which the user action was performed (title, amount, date, id)
 */

const UserActionAlert = ({ expense }) => {
  const { didErrorOccur, userAction, closeAlert } = useContext(GlobalContext);

  // base props probably does not need to be passed, since state variables are global
  const baseProps = { didErrorOccur, closeAlert };

  switch (userAction) {
    case 'add_expense':
      // required props: didErrorOccur, closeCallback
      return <ExpenseAddedAlert {...baseProps} />;
    case 'delete_expense':
      // required props: didErrorOccur, closeCallback, expense
      // takes `expense` prop to provide feedback about which expense was deleted
      return <ExpenseDeletedAlert {...baseProps} {...expense} />;
    case 'edit_expense':
      // required props: didErrorOccur, closeCallback
      return <ExpenseEditedAlert {...baseProps} />;
    default:
      return null;
  }
};

export default UserActionAlert;
