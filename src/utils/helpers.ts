import { Expense } from '../expense';

// Takes an amount in cents (integer) and 
// returns a formatted string representing the amount with two decimal places
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

// Takes a valid date string and returns a new string
// based on options format
export function getFormattedDate(date: Date | number, locale: string, options?: Intl.DateTimeFormatOptions): string {
  return Intl.DateTimeFormat(locale, options).format(date);
}

export function getCurrentMonth(locale: string): string {
  return getFormattedDate(Date.now(), locale, { year: 'numeric', month: 'long' });
}

export function getUniqueMonthsFromExpenses(expenseArray: Expense[]) {
  const expenseDates: number[] = expenseArray.map(expense => expense.date.getTime());
  expenseDates.push(Date.now());
  expenseDates.sort((dateA, dateB) => dateA - dateB);

  return expenseDates.reduce((uniqueMonths: string[], date) => {
    let month = getFormattedDate(date, 'en-GB', { month: 'long', year: 'numeric' });

    if (month && !uniqueMonths.includes(month)) {
      uniqueMonths.push(month);
    }

    return uniqueMonths;
  }, []);
}
