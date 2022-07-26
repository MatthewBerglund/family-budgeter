import { getFormattedAmount, getCurrentMonth, getUniqueMonthsFromExpenses } from './helpers';

import { Expense } from '../expense';
import { Timestamp } from 'firebase/firestore';

// Values and function for stubbing and resetting Date.now()
const realDateNow = Date.now.bind(global.Date);

function getDateNowStub(dateString) {
  const today = new Date(dateString);
  const dateNowStub = jest.fn(() => today.valueOf());
  return dateNowStub;
}

describe('getFormattedAmount', () => {
  it('should throw an error if passed a number that is not an integer', () => {
    expect(() => getFormattedAmount(1.1, 'en-GB')).toThrowError('1.1 is not an integer');
  });

  it('should return a string representing a full amount in the specified locale and currency', () => {
    expect(getFormattedAmount(456, 'en-GB')).toBe('4.56');
    expect(getFormattedAmount(456, 'en-GB', 'EUR')).toBe('€4.56');
    expect(getFormattedAmount(456, 'en-GB', 'GBP')).toBe('£4.56');
    expect(getFormattedAmount(456, 'de-DE')).toBe('4,56');
    expect(getFormattedAmount(456, 'de-DE', 'EUR')).toBe('4,56 €');
    expect(getFormattedAmount(456, 'en-US', 'USD')).toBe('$4.56');
  });
});

describe('getCurrentMonth', () => {
  afterAll(() => {
    global.Date.now = realDateNow;
  });

  it('should return the current month in "Month YYYY" format', () => {
    global.Date.now = getDateNowStub('2022-06-01');
    expect(getCurrentMonth('en-GB')).toBe('June 2022');

    global.Date.now = getDateNowStub('2024-02-29');
    expect(getCurrentMonth('en-GB')).toBe('February 2024');

    global.Date.now = getDateNowStub('2050-12-31');
    expect(getCurrentMonth('en-GB')).toBe('December 2050');
  });
});

describe('getUniqueMonthsFromExpenses', () => {
  afterAll(() => {
    global.Date.now = realDateNow;
  });

  it('should return a new array', () => {
    const inputArray: Expense[] = [];
    const outputArray = getUniqueMonthsFromExpenses(inputArray);
    expect(outputArray).not.toBe(inputArray);
  });

  it('should return an array of strings in "Month YYYY" format', () => {
    global.Date.now = getDateNowStub('2022-04-01');

    const expenses = [
      new Expense({ title: 'Expense 1', date: Timestamp.fromDate(new Date('2022-04-01')), amount: 100 }, '1'),
    ];

    const expected = ['April 2022'];
    const actual = getUniqueMonthsFromExpenses(expenses);
    expect(actual).toStrictEqual(expected);
  });

  it('should always return the current month', () => {
    global.Date.now = getDateNowStub('2022-04-01');
    const expenses: Expense[] = [];

    const expected = ['April 2022'];
    const actual = getUniqueMonthsFromExpenses(expenses);
    expect(actual).toStrictEqual(expected);
  });

  it('should not return duplicate months', () => {
    global.Date.now = getDateNowStub('2022-04-01');
    
    const expenses = [
      new Expense({ title: 'Expense 1', date: Timestamp.fromDate(new Date('2022-04-01')), amount: 100 }, '1'),
      new Expense({ title: 'Expense 2', date: Timestamp.fromDate(new Date('2022-04-02')), amount: 100 }, '2'),
    ];

    const expected = ['April 2022'];
    const actual = getUniqueMonthsFromExpenses(expenses);
    expect(actual).toStrictEqual(expected);
  });

  it('should return months sorted from least to most recent', () => {
    global.Date.now = getDateNowStub('2022-04-01');
    
    const expenses = [
      new Expense({ title: 'Apr 2022 expense', date: Timestamp.fromDate(new Date('2022-04-01')), amount: 100 }, '1'),
      new Expense({ title: 'Jan 2022 expense', date: Timestamp.fromDate(new Date('2022-01-01')), amount: 100 }, '2'),
      new Expense({ title: 'Jan 2021 expense', date: Timestamp.fromDate(new Date('2021-01-01')), amount: 100 }, '3'),
      new Expense({ title: 'Dec 2021 expense', date: Timestamp.fromDate(new Date('2021-12-01')), amount: 100 }, '4'),
    ];

    const expected = ['January 2021', 'December 2021', 'January 2022', 'April 2022'];
    const actual = getUniqueMonthsFromExpenses(expenses);
    expect(actual).toStrictEqual(expected);
  });
});
