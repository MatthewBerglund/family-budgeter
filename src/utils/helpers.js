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

// Takes a date string in `YYYY-MM-DD` format and returns a new string
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

export function getUniqueMonths(expenseArray) {
  const expenseDates = expenseArray.map(expense => new Date(expense.date));
  expenseDates.push(Date.now());
  expenseDates.sort((dateA, dateB) => {
    return dateA - dateB;
  });

  return expenseDates.reduce((uniqueMonths, date) => {
    let formattedDate = getUKFormattedDate(date, {
      year: 'numeric',
      month: 'long',
    });

    if (formattedDate && !uniqueMonths.includes(formattedDate)) {
      uniqueMonths.push(formattedDate);
    }

    return uniqueMonths;
  }, []);
}

// Takes a string representing a euro amount and returns an integer
// representing the same amount in cents. Avoids math calculations
// in order to prevent floating point errors.
export function convertEurosToCents(amount) {
  if (amount.includes('.')) {
    if (amount.indexOf('.') === amount.length - 2) {
      amount = amount + '0';
    }
    return parseFloat(amount.replace('.', ''));
  } else {
    return parseFloat(amount + '00');
  }
}
