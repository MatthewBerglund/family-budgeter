import ExpenseAddedAlert from './ExpenseAddedAlert';
import ExpenseDeletedAlert from './ExpenseDeletedAlert';
import ExpenseEditedAlert from './ExpenseEditedAlert';

import { useGlobalState } from '../../store/hooks';

// A dynamic alert component that displays feedback information based on a `userAction`
const UserActionAlert = () => {
  const { userAction } = useGlobalState();

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
