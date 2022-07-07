import { createContext, useEffect, useState } from 'react';
import { collection, doc, addDoc, deleteDoc, updateDoc, query, onSnapshot } from 'firebase/firestore';

import db from '../firebase';

const initialState = { expenses: [] };

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

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
        setState(prevState => ({ ...prevState, expenses }));
      });
    } catch (err) {
      console.log(err);
      alert('Error loading expenses. Please try again later.');
    }
  }, []);

  const addExpense = async expense => {
    try {
      const expensesRef = collection(db, 'expenses');
      await addDoc(expensesRef, expense);
    } catch (err) {
      console.log(err);
    }
  };

  const editExpense = async (id, newExpenseData) => {
    try {
      const expenseRef = doc(db, 'expenses', id);
      await updateDoc(expenseRef, newExpenseData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExpense = async id => {
    try {
      const expenseRef = doc(db, 'expenses', id);
      await deleteDoc(expenseRef);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GlobalContext.Provider value={{ ...state, addExpense, editExpense, deleteExpense }}>
      {children}
    </GlobalContext.Provider>
  );
};
