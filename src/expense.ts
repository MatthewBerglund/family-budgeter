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

/** Class representing an expense */
export class Expense {
  title: string;
  date: Date;
  amount: number;
  id: string;

  /**
   * Create an expense
   * @constructor
   * @param {ExpenseDataFirestore} expense An expense object stored on firestore
   * @param {string} id The unique alphanumeric key assigned to the expense on firestore
   */
  constructor(expense: ExpenseDataFirestore, id: string) {
    this.title = expense.title;
    this.date = expense.date.toDate();
    this.amount = expense.amount;
    this.id = id;
  }

  /**
   * Convert expense data for storage on firestore (ExpenseDataFirestore) and add to "expenses" collection
   * @static
   * @param {ExpenseDataForm} expense An object containing expense data
   */
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

  /**
   * Get the expense date in the specified format
   * @param {string} locale A string containing a BCP 47 language tag
   * @param {Intl.DateTimeFormatOptions} options Formatting options
   * @returns {string} The expense date in the specified format
   * @link See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat for more information
   */
  getFormattedDate(locale?: string, options?: Intl.DateTimeFormatOptions): string {
    return Intl.DateTimeFormat(locale, options).format(this.date);
  }

  /**
   * Get the expense amount in the specified format
   * @param {string} locale A string containing a BCP 47 language tag
   * @param {string} currency The currency to use for currency formatting
   * @returns {string} The expense amount in the specified format
   * @link See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat for more information
   */
  getFormattedAmount(locale?: string, currency?: string): string {
    const options = { minimumFractionDigits: 2 };

    if (currency) {
      options['style'] = 'currency';
      options['currency'] = currency;
    }

    const amount = this.amount / 100;
    return Intl.NumberFormat(locale, options).format(amount);
  }

  /**
   * Delete the expense from the "expenses" collection on firestore
   */
  async delete() {
    try {
      const expenseRef = doc(db, 'expenses', this.id);
      await deleteDoc(expenseRef);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Update the expense on firestore with new expense data
   * @param {ExpenseDataForm} expense - an object containing expense data
   */
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
