import { createContext, useEffect, useReducer } from 'react';
import { collection, doc, addDoc, deleteDoc, updateDoc, query, onSnapshot } from 'firebase/firestore';

import db from '../firebase';
import appReducer from './appReducer';

const initialState = {
  expenses: [],
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

  const globalFunctions = {
    addExpense,
    editExpense,
    deleteExpense,
    openConfirmDeleteModal,
    closeConfirmDeleteModal,
    openEditExpenseModal,
    closeEditExpenseModal,
    closeAlert,
  };

  async function addExpense(expense) {
    try {
      const expensesRef = collection(db, 'expenses');
      await addDoc(expensesRef, expense);
      dispatch({ type: 'ADD_EXPENSE_SUCCESS', payload: expense });
    } catch (err) {
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

  function closeAlert() {
    dispatch({ type: 'CLOSE_ALERT' });
  }

  return (
    <GlobalContext.Provider value={{ ...globalState, ...globalFunctions }}>
      {children}
    </GlobalContext.Provider>
  );
};
