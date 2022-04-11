// Takes an amount and returns a string representing
// the amount in euros for speakers of UK English
export function getUKFormattedEuros(amount) {
  const options = { style: 'currency', currency: 'EUR' };
  return Intl.NumberFormat('en-GB', options).format(amount);
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
