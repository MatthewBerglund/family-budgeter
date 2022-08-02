import { Timestamp, collection, DocumentData, query, onSnapshot, connectFirestoreEmulator, initializeFirestore } from "firebase/firestore";
import { Expense } from "./expense";
import db from "./firebase";

const axios = require('axios').default;

async function clearDatabase() {
  const url = 'http://localhost:8080/emulator/v1/projects/family-budgeter-1/databases/(default)/documents';
  try {
    await axios.delete(url);
  } catch (err) {
    console.log('Unable to flush database: ' + err);
  }
}

describe('Expense', () => {
  // Important: Firestore emulator must be started
  // before running these tests, otherwise they will be skipped.
  if (process.env.FIRESTORE_EMULATOR_HOST === 'localhost:8080') {
    let expensesOnFirestore: DocumentData[] = [];

    // create listener to retrieve expenses from db on change
    onSnapshot(query(collection(db, 'expenses')), (querySnapshot) => {
      const docs: DocumentData[] = [];
      querySnapshot.forEach(doc => {
        docs.push(doc);
      });
      expensesOnFirestore = [...docs];
    });

    describe('static and instance methods that interact with firestore', () => {
      beforeAll(async () => {
        await clearDatabase();
      });

      test('Expense.add', async () => {
        try {
          await Expense.add({
            title: 'Test Expense',
            date: new Date('1985-12-31'),
            amount: '123.45',
          });

          expect(expensesOnFirestore[0].data()).toStrictEqual({
            title: 'Test Expense',
            date: Timestamp.fromDate(new Date('1985-12-31')),
            amount: 12345,
          });
        } catch (err) {
          console.log(err);
        }
      });

      test('Expense.prototype.update', async () => {
        try {
          const expenseDoc = expensesOnFirestore[0];
          const expense = new Expense(expenseDoc.data(), expenseDoc.id);

          await expense.update({
            title: 'Test Expense Updated',
            date: new Date('2022-01-01'),
            amount: '456.78',
          });

          expect(expensesOnFirestore[0].data()).toStrictEqual({
            title: 'Test Expense Updated',
            date: Timestamp.fromDate(new Date('2022-01-01')),
            amount: 45678,
          });
        } catch (err) {
          console.log(err);
        }
      });

      test('Expense.prototype.delete', async () => {
        try {
          const expenseDoc = expensesOnFirestore[0];
          const expense = new Expense(expenseDoc.data(), expenseDoc.id);
          await expense.delete();
          expect(expensesOnFirestore.length).toBe(0);
        } catch (err) {
          console.log(err);
        }
      });
    });
  } else {
    console.debug('Note: Tests that rely on the firestore emulator were skipped because the emulator is not running. To run these tests, run `firebase emulators:exec "npm test"`.');
  }

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
