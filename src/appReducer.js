import { collection, addDoc } from 'firebase/firestore';
import db from './firebase';

const appReducer = (state, action) => {
  switch (action.type) {
    case "RESTORE_EXPENSES":
      return {
        ...state,
        expenses: action.payload,
      };
    case "ADD_EXPENSE":
      (async () => {
        const expense = action.payload;

        try {
          const expensesRef = collection(db, 'expenses');
          await addDoc(expensesRef, expense);
        } catch (err) {
          console.log(err);
        }

        return state;
      })();
    // case "EDIT_EXPENSE":
    //   (async () => {
    //     try {
    //       const expense = action.payload;
    //       const expenseRef = doc(db, 'expenses', expense.id);
    //       await updateDoc(expenseRef, expense);

    //       const updatedExpenseMonth = getUKFormattedDate(expense.date, { year: 'numeric', month: 'long' });

    //       if (updatedExpenseMonth !== selectedMonth && filteredExpenses.length === 1) {
    //         selectedMonth = currentMonth;
    //       }
    //     } catch (err) {
    //       console.log(err);
    //       didErrorOccur = true;
    //     }

    //     return {
    //       ...state,
    //       didErrorOccur,
    //       selectedMonth,
    //       userAction: 'edit_expense',
    //       isAlertOpen: true,
    //     };
    //   })();
    // case "DELETE_EXPENSE":
    //   (async () => {
    //     try {
    //       const expenseRef = doc(db, 'expenses', action.payload);
    //       await deleteDoc(expenseRef);

    //       if (filteredExpenses.length === 1) {
    //         selectedMonth = currentMonth;
    //       }
    //     } catch (err) {
    //       console.log(err);
    //       didErrorOccur = true;
    //     }

    //     return {
    //       ...state,
    //       didErrorOccur,
    //       selectedMonth,
    //       isConfirmDeleteModalOpen,
    //       userAction: 'delete_expense',
    //       isAlertOpen: true,
    //     };
    //   })();
    default:
      return state;
  }
};

export default appReducer;
