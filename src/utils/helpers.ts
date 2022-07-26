import { Expense } from '../expense';

// Takes an amount in cents and returns a formatted string representing the full amount
export function getFormattedAmount(amount: number, locale: string, currency?: string): string {
  if (!Number.isInteger(amount)) {
    throw new TypeError(`${amount} is not an integer`);
  }

  const options = { minimumFractionDigits: 2 };

  if (currency) {
    options['style'] = 'currency';
    options['currency'] = currency;
  }

  return Intl.NumberFormat(locale, options).format(amount / 100);
}

// export function getUKFormattedEuros(centAmount) {
//   if (!Number.isInteger(centAmount)) {
//     throw new TypeError(`${centAmount} is not an integer`);
//   }

//   if (arguments.length > 1) {
//     throw new RangeError('Only one argument may be passed to the function.');
//   }

//   const options = { style: 'currency', currency: 'EUR' };
//   return Intl.NumberFormat('en-GB', options).format(centAmount / 100);
// }

// Takes a valid date string and returns a new string
// based on options format
export function getFormattedDate(date: Date | number, locale: string, options?: Intl.DateTimeFormatOptions): string {
  return Intl.DateTimeFormat(locale, options).format(date);
}

// export function getUKFormattedDate(
//   dateString,
//   options = { year: 'numeric', month: 'numeric', day: 'numeric' }
// ) {
//   const dateObj = new Date(dateString);
//   return Intl.DateTimeFormat('en-GB', options).format(dateObj);
// }

export function getCurrentMonth(): string {
  return getFormattedDate(Date.now(), 'en-GB', { year: 'numeric', month: 'long' });
}

export function getUniqueMonthsFromExpenses(expenseArray: Expense[]) {
  if (!Array.isArray(expenseArray)) {
    throw new TypeError(`${expenseArray} is not an array`);
  }

  if (arguments.length > 1) {
    throw new RangeError('Only one argument may be passed to the function.');
  }

  const expenseDates: number[] = expenseArray.map(expense => expense.date.getTime());
  expenseDates.push(Date.now());
  expenseDates.sort((dateA, dateB) => dateA - dateB);

  return expenseDates.reduce((uniqueMonths: string[], date) => {
    let formattedDate = getFormattedDate(date, 'en-GB', { month: 'long', year: 'numeric' });

    if (formattedDate && !uniqueMonths.includes(formattedDate)) {
      uniqueMonths.push(formattedDate);
    }

    return uniqueMonths;
  }, []);
}
