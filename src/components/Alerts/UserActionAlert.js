import { useContext } from 'react';

import ExpenseAddedAlert from './ExpenseAddedAlert';
import ExpenseDeletedAlert from './ExpenseDeletedAlert';
import ExpenseEditedAlert from './ExpenseEditedAlert';

import { GlobalContext } from '../../store/GlobalState';

// A dynamic alert component that displays feedback information based on a `userAction`
const UserActionAlert = () => {
  const { userAction } = useContext(GlobalContext);

  switch (userAction) {
    case 'add_expense':
      return <ExpenseAddedAlert />;
    case 'delete_expense':
      return <ExpenseDeletedAlert />;
    case 'edit_expense':
      return <ExpenseEditedAlert />;
    default:
      return null;
  }
};

export default UserActionAlert;
