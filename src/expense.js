import { collection, doc, addDoc, deleteDoc } from 'firebase/firestore';

import { getUKFormattedDate } from './utils/helpers';

import db from './firebase';

class Expense {
  constructor(title, date, amount, id) {
    this.title = title;
    this.date = date;
    this.amount = amount;
    this.id = id;
  }

  // Adds expense data to "expenses" collection on firestore
  static async add(title, date, amount) {
    const expense = { title, date, amount };
    try {
      const expensesRef = collection(db, 'expenses');
      await addDoc(expensesRef, expense);
    } catch (err) {
      console.log(err);
    }
  }

  async delete() {
    try {
      const expenseRef = doc(db, 'expenses', this.id);
      await deleteDoc(expenseRef);
    } catch (err) {
      console.log(err);
    }
  }

  getMonth() {
    return getUKFormattedDate(new Date(this.date), { year: 'numeric', month: 'long' });
  }

  getFormattedAmount() {
    return Number.parseFloat(this.amount / 100).toFixed(2);
  }
};

export default Expense;
