import { collection, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import db from '../firebase';
import { getUKFormattedDate } from './utils/helpers';

const appReducer = (state, action) => {
  let filteredExpenses = state.filteredExpenses;
  let selectedMonth = state.selectedMonth;
  let currentMonth = state.currentMonth;
  let isConfirmMonthModalOpen = false;
  let isConfirmDeleteModalOpen = false;
  let didErrorOccur = false;

  switch (action.type) {
    case "ADD_EXPENSE":
      (async () => {
        try {
          const expensesRef = collection(db, 'expenses');
          await addDoc(expensesRef, action.payload);
        } catch (err) {
          console.log(err);
          didErrorOccur = true;
        }

        if (state.newExpenseMonth !== currentMonth) {
          isConfirmMonthModalOpen = true;
        }

        return {
          ...state,
          didErrorOccur,
          isConfirmMonthModalOpen,
          userAction: 'add_expense',
          isAlertOpen: true,
        };
      })();
    case "EDIT_EXPENSE":
      (async () => {
        try {
          const expense = action.payload;
          const expenseRef = doc(db, 'expenses', expense.id);
          await updateDoc(expenseRef, expense);

          const updatedExpenseMonth = getUKFormattedDate(expense.date, {
            year: 'numeric',
            month: 'long',
          });

          if (updatedExpenseMonth !== selectedMonth && filteredExpenses.length === 1) {
            selectedMonth = currentMonth;
          }
        } catch (err) {
          console.log(err);
          didErrorOccur = true;
        }

        return {
          ...state,
          didErrorOccur,
          selectedMonth,
          userAction: 'edit_expense',
          isAlertOpen: true,
        };
      })();
    case "DELETE_EXPENSE":
      (async () => {
        try {
          const expenseRef = doc(db, 'expenses', action.payload);
          await deleteDoc(expenseRef);

          if (filteredExpenses.length === 1) {
            selectedMonth = currentMonth;
          }
        } catch (err) {
          console.log(err);
          didErrorOccur = true;
        }

        return {
          ...state,
          didErrorOccur,
          selectedMonth,
          isConfirmDeleteModalOpen,
          userAction: 'delete_expense',
          isAlertOpen: true,
        };
      })();
    case "RESTORE_EXPENSES":
      return {
        ...state,
        expenses: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
