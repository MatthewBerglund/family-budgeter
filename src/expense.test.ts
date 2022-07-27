import { Timestamp } from "firebase/firestore";
import { Expense } from "./expense";

describe('Expense', () => {
  const expense = new Expense({
    title: 'Test Expense',
    date: Timestamp.fromDate(new Date('1985-03-18')),
    amount: 12345
  }, 'abc123');

  test('Instance properties', () => {
    expect(expense.title).toBe('Test Expense');
    expect(expense.date).toStrictEqual(new Date('1985-03-18'));
    expect(expense.amount).toBe(12345);
    expect(expense.id).toBe('abc123');
  })

  test('getFormattedDate', () => {
    expect(expense.getFormattedDate('en-GB')).toBe('18/03/1985');
    expect(expense.getFormattedDate('en-GB', { month: 'long', year: 'numeric'})).toBe('March 1985');
    expect(expense.getFormattedDate('en-US')).toBe('3/18/1985');
    expect(expense.getFormattedDate('en-US', { month: 'long', year: 'numeric'})).toBe('March 1985');
    expect(expense.getFormattedDate('de-DE')).toBe('18.3.1985');
    expect(expense.getFormattedDate('de-DE', { month: 'long', year: 'numeric'})).toBe('März 1985');
  });

  test('getFormattedAmount', () => {
    expect(expense.getFormattedAmount('en-GB')).toBe('123.45');
    expect(expense.getFormattedAmount('en-GB', 'EUR')).toBe('€123.45');
    expect(expense.getFormattedAmount('en-GB', 'GBP')).toBe('£123.45');
    expect(expense.getFormattedAmount('en-US', 'USD')).toBe('$123.45');
    expect(expense.getFormattedAmount('de-DE', 'EUR')).toBe('123,45 €');
  })
});