import { createContext, useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';

import db from '../firebase';

import { Expense } from '../expense';

interface GlobalState {
  expenses: Expense[];
}

const initialState: GlobalState = { expenses: [] };

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // Listen for changes to any doc in "expenses" collection and update expenses in app
  useEffect(() => {
    try {
      const q = query(collection(db, 'expenses'));

      onSnapshot(q, (querySnapshot) => {
        const expenses: Expense[] = [];
        querySnapshot.forEach(doc => {
          const { title, date, amount } = doc.data();
          const expense: Expense = new Expense({ title, date, amount }, doc.id);
          expenses.push(expense);
        });
        setState(prevState => ({ ...prevState, expenses }));
      });
    } catch (err) {
      console.log(err);
      alert('Error loading expenses. Please try again later.');
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ ...state }}>
      {children}
    </GlobalContext.Provider>
  );
};
