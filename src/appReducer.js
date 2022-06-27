import { getUKFormattedDate } from './utils/helpers';

const appReducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_EXPENSES':
      return {
        ...state,
        expenses: action.payload,
      };

    case 'ADD_EXPENSE_SUCCESS':
      const expense = action.payload;
      const expenseDate = new Date(expense.date);
      const expenseMonth = getUKFormattedDate(expenseDate, { year: 'numeric', month: 'long' });
      return {
        ...state,
        lastAddedExpense: { ...expense },
        isConfirmMonthModalOpen: expenseMonth !== state.selectedMonth,
        didErrorOccur: false,
        isAlertOpen: true,
        userAction: 'add_expense',
      };

    case 'ADD_EXPENSE_FAIL':
      return {
        ...state,
        didErrorOccur: true,
        isAlertOpen: true,
        userAction: 'add_expense'
      };

    // case 'EDIT_EXPENSE':

    case 'DELETE_EXPENSE_SUCCESS':
      return {
        ...state,
        didErrorOccur: false,
        isAlertOpen: true,
        userAction: 'delete_expense',
        isConfirmDeleteModalOpen: false,
      };

    case 'CHANGE_MONTH_VIEW':
      return {
        ...state,
        selectedMonth: action.payload,
        isConfirmMonthModalOpen: false,
      };

    case 'CLOSE_CONFIRM_MONTH_MODAL':
      return { ...state, isConfirmMonthModalOpen: false };

    case 'OPEN_CONFIRM_DELETE_MODAL':
      return {
        ...state,
        isConfirmDeleteModalOpen: true,
        expenseToDelete: action.payload
      };

    case 'CLOSE_CONFIRM_DELETE_MODAL':
      return { ...state, isConfirmDeleteModalOpen: false };

    case 'CLOSE_ALERT':
      return { ...state, isAlertOpen: false };

    default:
      return state;
  }
};

export default appReducer;
