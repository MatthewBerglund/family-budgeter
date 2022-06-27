import { createContext, useReducer } from 'react';
import { collection, addDoc } from 'firebase/firestore';

import db from './firebase';
import appReducer from './appReducer';
import { getCurrentMonth } from './utils/helpers';

const initialState = {
  expenses: [],
  currentMonth: getCurrentMonth(),
  selectedMonth: getCurrentMonth(),
  lastAddedExpense: {},
  isConfirmMonthModalOpen: false,
  didErrorOccur: false,
  isAlertOpen: false,
  userAction: '',
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer(appReducer, initialState);

  async function addExpense(expense) {
    try {
      const expensesRef = collection(db, 'expenses');
      await addDoc(expensesRef, expense);
      dispatch({ type: 'ADD_EXPENSE_SUCCESS', payload: expense });
    } catch (err) {
      console.log(err);
      dispatch({ type: 'ADD_EXPENSE_FAIL' });
    }
  }

  function editExpense(id, newExpenseData) {
    dispatch({ type: 'EDIT_EXPENSE', payload: { ...newExpenseData, id } });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  }

  function restoreExpenses(expenses) {
    dispatch({ type: 'RESTORE_EXPENSES', payload: expenses });
  }

  function changeMonthView(month) {
    dispatch({ type: 'CHANGE_MONTH_VIEW', payload: month });
  }

  function closeConfirmMonthModal() {
    dispatch({ type: 'CANCEL_MONTH_CHANGE' });
  }

  function closeAlert() {
    dispatch({ type: 'CLOSE_ALERT' });
  }

  return (
    <GlobalContext.Provider
      value={{
        ...globalState,
        addExpense,
        editExpense,
        deleteExpense,
        restoreExpenses,
        changeMonthView,
        closeConfirmMonthModal,
        closeAlert,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
