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
  _title: string;
  _date: Date;
  _amount: number;
  _id: string;

  constructor(expense: ExpenseDataFirestore, id: string) {
    this._title = expense.title;
    this._date = expense.date.toDate();
    this._amount = expense.amount;
    this._id = id;
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

  get title(): string {
    return this._title;
  }

  // returns the expense date in DD/MM/YYYY format
  get date(): Date {
    return this._date;
  }
  
  get formattedDate() {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return Intl.DateTimeFormat('en-GB', options).format(this._date);
  }

  // returns the expense month in MONTH YYYY format
  get month(): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return Intl.DateTimeFormat('en-GB', options).format(this._date);
  }

  // returns the raw amount in cents
  get amount(): number {
    return this._amount;
  }

  get id() {
    return this._id;
  }

  // returns the formatted expense amount with two decimal places
  getFormattedAmount(locale: string, currency?: string): string {
    const options = { minimumFractionDigits: 2 };

    if (currency) {
      options['style'] = 'currency';
      options['currency'] = currency;
    }

    const amount = this._amount / 100;
    return Intl.NumberFormat(locale, options).format(amount);
  }

  async delete() {
    try {
      const expenseRef = doc(db, 'expenses', this._id);
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
      const expenseRef = doc(db, 'expenses', this._id);
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
