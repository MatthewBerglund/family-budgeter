// Takes an amount and returns a string representing
// the amount in euros for speakers of UK English
export function getUKFormattedEuros(amount) {
  const options = { style: 'currency', currency: 'EUR' };
  return Intl.NumberFormat('en-GB', options).format(amount);
}

// Takes a date string in `YYYY-MM-DD` format and returns a new string
// in `DD/MM/YYYY` format
export function getUKFormattedDate(dateString) {
  const dateObj = new Date(dateString);
  return Intl.DateTimeFormat('en-GB').format(dateObj);
}
