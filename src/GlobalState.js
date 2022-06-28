import { createContext, useReducer } from 'react';
import { collection, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

import db from './firebase';
import appReducer from './appReducer';
import { getCurrentMonth } from './utils/helpers';

const currentMonth = getCurrentMonth();

const initialState = {
  expenses: [],
  currentMonth: currentMonth,
  selectedMonth: currentMonth,
  lastAddedExpense: {},
  expenseToDelete: {},
  expenseToEdit: {},
  isConfirmMonthModalOpen: false,
  isConfirmDeleteModalOpen: false,
  isEditExpenseModalOpen: false,
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

  async function editExpense(id, newExpenseData) {
    try {
      const expenseRef = doc(db, 'expenses', id);
      await updateDoc(expenseRef, newExpenseData);
      dispatch({ type: 'EDIT_EXPENSE_SUCCESS', payload: newExpenseData });
    } catch (err) {
      console.log(err);
      dispatch({ type: 'EDIT_EXPENSE_FAIL' });
    }
  }

  async function deleteExpense(id) {
    try {
      const expenseRef = doc(db, 'expenses', id);
      await deleteDoc(expenseRef);
      dispatch({ type: 'DELETE_EXPENSE_SUCCESS' });
    } catch (err) {
      console.log(err);
      dispatch({ type: 'DELETE_EXPENSE_FAIL' });
    }
  }

  function restoreExpenses(expensesQuerySnapshot) {
    const expenses = [];
    expensesQuerySnapshot.forEach(doc => {
      let expense = { ...doc.data(), id: doc.id };
      expenses.push(expense);
    });
    dispatch({ type: 'RESTORE_EXPENSES', payload: expenses });
  }

  function changeMonthView(month) {
    dispatch({ type: 'CHANGE_MONTH_VIEW', payload: month });
  }

  function openConfirmDeleteModal(expense) {
    dispatch({ type: 'OPEN_CONFIRM_DELETE_MODAL', payload: expense });
  }

  function closeConfirmDeleteModal() {
    dispatch({ type: 'CLOSE_CONFIRM_DELETE_MODAL' });
  }

  function openEditExpenseModal(expense) {
    dispatch({ type: 'OPEN_EDIT_EXPENSE_MODAL', payload: expense });
  }

  function closeEditExpenseModal() {
    dispatch({ type: 'CLOSE_EDIT_EXPENSE_MODAL' });
  }

  function closeConfirmMonthModal() {
    dispatch({ type: 'CLOSE_CONFIRM_MONTH_MODAL' });
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
        openConfirmDeleteModal,
        closeConfirmDeleteModal,
        openEditExpenseModal,
        closeEditExpenseModal,
        closeConfirmMonthModal,
        closeAlert,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
