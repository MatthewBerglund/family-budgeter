// Takes an amount and returns a string representing
// the amount in euros for speakers of UK English
export function getUKFormattedEuros(amount) {
  const options = { style: 'currency', currency: 'EUR' };
  return Intl.NumberFormat('en-GB', options).format(amount);
}

// Takes a date string in `YYYY-MM-DD` format and returns a new string
// based on options format
export function getUKFormattedDate(dateString, options) {
  const dateObj = new Date(dateString);
  return Intl.DateTimeFormat('en-GB', options).format(dateObj);
}

export function getCurrentMonth() {
  return getUKFormattedDate(Date.now(), { year: 'numeric', month: 'long' });
}

export function getUniqueMonths(expenseArray) {
  return expenseArray.reduce(
    (uniqueMonths, expense) => {
      let formattedExpenseDate = getUKFormattedDate(new Date(expense.date), {
        year: 'numeric',
        month: 'long',
      });

      if (
        formattedExpenseDate &&
        !uniqueMonths.includes(formattedExpenseDate)
      ) {
        uniqueMonths.push(formattedExpenseDate);
      }
      return uniqueMonths;
    },
    [getCurrentMonth()]
  );
}
