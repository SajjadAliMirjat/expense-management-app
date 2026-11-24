export const CURRENCIES = ['PKR', 'USD', 'EUR', 'GBP'];
export function formatCurrency(amount, currency = 'PKR') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'PKR' ? 0 : 2,
  }).format(amount || 0);
}
export const formatCompact = (n) => new Intl.NumberFormat('en', { notation: 'compact' }).format(n);
