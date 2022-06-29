import { getUKFormattedDate } from './utils/helpers';

const appReducer = (state, action) => {
  let expense;
  let expenseMonth;

  switch (action.type) {
    case 'RESTORE_EXPENSES':
      return {
        ...state,
        expenses: action.payload,
      };

    case 'ADD_EXPENSE_SUCCESS':
      expense = action.payload;
      expenseMonth = getUKFormattedDate(expense.date, { year: 'numeric', month: 'long' });

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
        userAction: 'add_expense',
      };

    case 'EDIT_EXPENSE_SUCCESS':
      return {
        ...state,
        didErrorOccur: false,
        userAction: 'edit_expense',
        isAlertOpen: true,
        isEditExpenseModalOpen: false,
      };

    case 'EDIT_EXPENSE_FAIL':
      return {
        ...state,
        didErrorOccur: true,
        userAction: 'edit_expense',
        isAlertOpen: true,
        isEditExpenseModalOpen: false,
      };

    case 'DELETE_EXPENSE_SUCCESS':
      return {
        ...state,
        didErrorOccur: false,
        isAlertOpen: true,
        userAction: 'delete_expense',
        isConfirmDeleteModalOpen: false,
      };

    case 'DELETE_EXPENSE_FAIL':
      return {
        ...state,
        didErrorOccur: true,
        userAction: 'delete_expense',
        isAlertOpen: true,
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
        expenseToDelete: action.payload,
      };

    case 'CLOSE_CONFIRM_DELETE_MODAL':
      return { ...state, isConfirmDeleteModalOpen: false };

    case 'OPEN_EDIT_EXPENSE_MODAL':
      return {
        ...state,
        isEditExpenseModalOpen: true,
        expenseToEdit: action.payload,
      };

    case 'CLOSE_EDIT_EXPENSE_MODAL':
      return { ...state, isEditExpenseModalOpen: false };

    case 'CLOSE_ALERT':
      return { ...state, isAlertOpen: false };

    default:
      return state;
  }
};

export default appReducer;
