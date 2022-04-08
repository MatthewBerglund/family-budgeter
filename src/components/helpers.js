// Takes a string representing an amount and returns a new
// string representing the amount in euros for speakers of UK English
export function getUKFormattedEuros(stringAmount) {
  const formattedAmount = Intl
    .NumberFormat('en-UK', { style: 'currency', currency: 'EUR' })
    .format(stringAmount);
  return formattedAmount;
} 
