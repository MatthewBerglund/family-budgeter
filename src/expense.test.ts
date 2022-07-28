import { getDocs, Timestamp, collection, DocumentData } from "firebase/firestore";
import { Expense, ExpenseDataFirestore, ExpenseDataForm } from "./expense";
import db from "./firebase";

const axios = require('axios').default;

const expenseDataRaw: ExpenseDataForm = {
  title: 'Test Expense',
  date: new Date('1985-03-18'),
  amount: '123.45',
};

const expenseDataFirestore: ExpenseDataFirestore = {
  title: 'Test Expense',
  date: Timestamp.fromDate(new Date('1985-03-18')),
  amount: 12345,
};

describe('Expense', () => {
  // Firestore emulator must be started with `firebase emulators:exec "npm start"`
  // before these tests can be run
  describe('static and instance methods that interact with firestore', () => {
    beforeAll(async () => {
      // flush db
      const url = 'http://localhost:8080/emulator/v1/projects/family-budgeter-1/databases/(default)/documents';
      axios.delete(url).catch(err => console.log('Unable to flush database: ' + err));
    });

    test('Expense.add', async () => {
      try {
        await Expense.add(expenseDataRaw);
        const querySnapshot = await getDocs(collection(db, 'expenses'));
        const expenses: DocumentData[] = [];
        querySnapshot.forEach(doc => expenses.push(doc.data()));
        expect(expenses[0]).toStrictEqual(expenseDataFirestore);
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe('instance properties and methods', () => {
    const expense = new Expense({
      title: 'Test Expense',
      date: Timestamp.fromDate(new Date('1985-03-18')),
      amount: 12345,
    }, 'abc123');

    test('instance properties', () => {
      expect(expense.title).toBe('Test Expense');
      expect(expense.date).toStrictEqual(new Date('1985-03-18'));
      expect(expense.amount).toBe(12345);
      expect(expense.id).toBe('abc123');
    });

    test('Expense.prototype.getFormattedDate', () => {
      expect(expense.getFormattedDate('en-GB')).toBe('18/03/1985');
      expect(
        expense.getFormattedDate('en-GB', { month: 'long', year: 'numeric' })
      ).toBe('March 1985');
      expect(expense.getFormattedDate('en-US')).toBe('3/18/1985');
      expect(
        expense.getFormattedDate('en-US', { month: 'long', year: 'numeric' })
      ).toBe('March 1985');
      expect(expense.getFormattedDate('de-DE')).toBe('18.3.1985');
      expect(
        expense.getFormattedDate('de-DE', { month: 'long', year: 'numeric' })
      ).toBe('März 1985');
    });

    test('Expense.prototype.getFormattedAmount', () => {
      expect(expense.getFormattedAmount('en-GB')).toBe('123.45');
      expect(expense.getFormattedAmount('en-GB', 'EUR')).toBe('€123.45');
      expect(expense.getFormattedAmount('en-GB', 'GBP')).toBe('£123.45');
      expect(expense.getFormattedAmount('en-US', 'USD')).toBe('$123.45');
      expect(expense.getFormattedAmount('de-DE', 'EUR')).toBe('123,45 €');
    });
  });
});
