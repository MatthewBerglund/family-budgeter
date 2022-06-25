import { createContext, useReducer } from 'react';

import appReducer from './appReducer';
import { getCurrentMonth } from './utils/helpers';

const initialState = { expenses: [] };

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const currentMonth = getCurrentMonth();

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
        expenses: state.expenses,
        addExpense,
        editExpense,
        deleteExpense,
        restoreExpenses,
        currentMonth,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
