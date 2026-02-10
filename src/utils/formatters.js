import { format, parseISO } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown date';
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  } catch {
    return dateString;
  }
};

export const formatRuntime = (minutes) => {
  if (!minutes) return 'Unknown runtime';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatCurrency = (amount) => {
  if (!amount) return 'Unknown';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};