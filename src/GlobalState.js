import { createContext, useReducer } from "react";

import appReducer from "./appReducer";

const expenses = [];
const filteredExpenses = expenses;

const currentMonth = getCurrentMonth();
const selectedMonth = currentMonth;
// Compared against selected month to hide or show ConfirmMonthModal
const newExpenseMonth = selectedMonth;

const userAction = '';
const didErrorOccur = false;
const lastExpenseDeleted = {};
const expenseToEdit = {}

const isAlertOpen = false;
const isEditExpenseModalOpen = false;
const isConfirmMonthModalOpen = false;
const isConformDeleteModalOpen = false;

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
  isEditExpenseModalOpen
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function addExpense(expense) {
    dispatch({
      type: 'ADD_EXPENSE',
      payload: expense,
    });
  }

  function editExpense(id, newExpenseData) {
    dispatch({
      type: 'EDIT_EXPENSE',
      payload: { ...newExpenseData, id },
    });
  }

  function deleteExpense(id) {
    dispatch({
      type: 'EDIT_EXPENSE',
      payload: id,
    });
  }
};
