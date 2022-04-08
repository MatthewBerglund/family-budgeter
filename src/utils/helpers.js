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

export function getUniqueMonths(expenseArray) {
  return expenseArray.reduce((acc, expense) => {
    let formattedExpenseDate = getUKFormattedDate(new Date(expense.date), {
      year: '2-digit',
      month: 'long',
    });

    if (
      acc.lentgh !== 0 &&
      formattedExpenseDate &&
      !acc.includes(formattedExpenseDate)
    ) {
      acc.push(formattedExpenseDate);
    }

    return acc;
  }, []);
}
