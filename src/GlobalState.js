import { createContext, useReducer } from 'react';

import appReducer from './appReducer';

// Expense history states
const expenses = [];
const filteredExpenses = expenses;

// Month view states
const currentMonth = getCurrentMonth();
const selectedMonth = currentMonth;
const newExpenseMonth = selectedMonth;

// Alert states and visibility
const userAction = '';
const didErrorOccur = false;
const lastExpenseDeleted = {};
const isAlertOpen = false;

// Modal states and visibility
const isConfirmMonthModalOpen = false;
const isConformDeleteModalOpen = false;
const isEditExpenseModalOpen = false;
const expenseToEdit = {};

const initialState = {
  expenses,
  filteredExpenses,
  currentMonth,
  selectedMonth,
  newExpenseMonth,
  userAction,
  didErrorOccur,
  lastExpenseDeleted,
  expenseToEdit,
  isAlertOpen,
  isConfirmMonthModalOpen,
  isConformDeleteModalOpen,
  isEditExpenseModalOpen,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function addExpense(expense) {
    dispatch({ type: 'ADD_EXPENSE', payload: expense });
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

  return (
    <GlobalContext.Provider
      value={{
        state,
        addExpense,
        editExpense,
        deleteExpense,
        restoreExpenses
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
