import { createContext, useEffect, useReducer } from 'react';
import { collection, doc, addDoc, deleteDoc, updateDoc, query, onSnapshot } from 'firebase/firestore';

import db from './firebase';
import appReducer from './appReducer';
import { getCurrentMonth, getUKFormattedDate } from './utils/helpers';

const currentMonth = getCurrentMonth();

const initialState = {
  expenses: [],
  selectedMonthExpenses: [],
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

  const { expenses, selectedMonth, currentMonth, selectedMonthExpenses } = globalState;

  // Listen for changes to any doc in "expenses" collection and update expenses in app
  useEffect(() => {
    try {
      const q = query(collection(db, 'expenses'));

      onSnapshot(q, (querySnapshot) => {
        const expenses = [];
        querySnapshot.forEach(doc => {
          let expense = { ...doc.data(), id: doc.id };
          expenses.push(expense);
        });
        dispatch({ type: 'RESTORE_EXPENSES', payload: expenses });
      });
    } catch (err) {
      console.log(err);
      alert('Error loading expenses. Please try again later.');
    }
  }, []);

  // Filter for expenses that belong in the selected month
  useEffect(() => {
    const filteredExpenses = expenses
      .filter(expense => {
        const expenseMonth = getUKFormattedDate(new Date(expense.date), { year: 'numeric', month: 'long' });
        return selectedMonth === expenseMonth;
      })
      .sort((expenseA, expenseB) => new Date(expenseB.date) - new Date(expenseA.date));

    dispatch({ type: 'UPDATE_SELECTED_MONTH_EXPENSES', payload: filteredExpenses });
  }, [expenses, selectedMonth]);

  useEffect(() => {
    if (selectedMonthExpenses.length === 0) {
      changeMonthView(currentMonth);
    }
  }, [selectedMonthExpenses, currentMonth]);

  const globalFunctions = {
    addExpense,
    editExpense,
    deleteExpense,
    changeMonthView,
    openConfirmDeleteModal,
    closeConfirmDeleteModal,
    openEditExpenseModal,
    closeEditExpenseModal,
    closeConfirmMonthModal,
    closeAlert,
  };

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
    let didErrorOccur = false;

    try {
      const expenseRef = doc(db, 'expenses', id);
      await updateDoc(expenseRef, newExpenseData);
    } catch (err) {
      console.log(err);
      didErrorOccur = true;
    }

    dispatch({ type: 'EDIT_EXPENSE', payload: didErrorOccur });
  }

  async function deleteExpense(id) {
    let didErrorOccur = false;

    try {
      const expenseRef = doc(db, 'expenses', id);
      await deleteDoc(expenseRef);
    } catch (err) {
      console.log(err);
      didErrorOccur = true;
    }

    dispatch({ type: 'DELETE_EXPENSE', payload: didErrorOccur });
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
    <GlobalContext.Provider value={{ globalState, globalFunctions }}>
      {children}
    </GlobalContext.Provider>
  );
};
