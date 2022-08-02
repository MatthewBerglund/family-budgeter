import { collection, doc, addDoc, deleteDoc, updateDoc, Timestamp } from 'firebase/firestore';

import db from './firebase';

export interface ExpenseDataFirestore {
  title: string;
  date: Timestamp;
  amount: number;
}

export interface ExpenseDataForm {
  title: string;
  date: Date;
  amount: string;
}

export class Expense {
  title: string;
  date: Date;
  amount: number;
  id: string;

  constructor(expense: ExpenseDataFirestore, id: string) {
    this.title = expense.title;
    this.date = expense.date.toDate();
    this.amount = expense.amount;
    this.id = id;
  }

  // Adds expense data to "expenses" collection on firestore
  static async add(expense: ExpenseDataForm) {
    const data: ExpenseDataFirestore = {
      title: expense.title,
      date: Timestamp.fromDate(expense.date),
      amount: convertEurosToCents(expense.amount),
    };

    try {
      const expensesRef = collection(db, 'expenses');
      await addDoc(expensesRef, data);
    } catch (err) {
      console.log(err);
    }
  }

  getFormattedDate(locale: string, options?: Intl.DateTimeFormatOptions): string {
    return Intl.DateTimeFormat(locale, options).format(this.date);
  }

  getFormattedAmount(locale: string, currency?: string): string {
    const options = { minimumFractionDigits: 2 };

    if (currency) {
      options['style'] = 'currency';
      options['currency'] = currency;
    }

    const amount = this.amount / 100;
    return Intl.NumberFormat(locale, options).format(amount);
  }

  async delete() {
    try {
      const expenseRef = doc(db, 'expenses', this.id);
      await deleteDoc(expenseRef);
    } catch (err) {
      console.log(err);
    }
  }

  async update(expense: ExpenseDataForm) {
    const data: ExpenseDataFirestore = {
      title: expense.title,
      date: Timestamp.fromDate(expense.date),
      amount: convertEurosToCents(expense.amount),
    };

    try {
      const expenseRef = doc(db, 'expenses', this.id);
      await updateDoc(expenseRef, { ...data });
    } catch (err) {
      console.log(err);
    }
  }
};

function convertEurosToCents(amount: number | string): number {
  let str = typeof amount === 'number' ? amount.toString() : amount;
  
  if (str.includes('.')) {
    if (str.indexOf('.') === str.length - 2) {
      str = str + '0';
    }
    return parseFloat(str.replace('.', ''));
  } else {
    return parseFloat(str + '00');
  }
}
