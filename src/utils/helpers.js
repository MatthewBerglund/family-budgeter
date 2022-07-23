// Takes an amount in cents and returns a string representing
// the amount in euros for speakers of UK English
export function getUKFormattedEuros(centAmount) {
  if (!Number.isInteger(centAmount)) {
    throw new TypeError(`${centAmount} is not an integer`);
  }

  if (arguments.length > 1) {
    throw new RangeError('Only one argument may be passed to the function.');
  }

  const options = { style: 'currency', currency: 'EUR' };
  return Intl.NumberFormat('en-GB', options).format(centAmount / 100);
}

// Takes a valid date string and returns a new string
// based on options format
export function getUKFormattedDate(
  dateString,
  options = { year: 'numeric', month: 'numeric', day: 'numeric' }
) {
  const dateObj = new Date(dateString);
  return Intl.DateTimeFormat('en-GB', options).format(dateObj);
}

export function getCurrentMonth() {
  return getUKFormattedDate(Date.now(), { year: 'numeric', month: 'long' });
}

export function getUniqueMonthsFromExpenses(expenseArray) {
  if (!Array.isArray(expenseArray)) {
    throw new TypeError(`${expenseArray} is not an array`);
  }

  if (arguments.length > 1) {
    throw new RangeError('Only one argument may be passed to the function.');
  }

  const expenseDates = expenseArray.map(expense => expense.date);
  expenseDates.push(Date.now());
  expenseDates.sort((dateA, dateB) => dateA - dateB);

  return expenseDates.reduce((uniqueMonths, date) => {
    let formattedDate = getUKFormattedDate(date, { month: 'long', year: 'numeric' });

    if (formattedDate && !uniqueMonths.includes(formattedDate)) {
      uniqueMonths.push(formattedDate);
    }

    return uniqueMonths;
  }, []);
}
