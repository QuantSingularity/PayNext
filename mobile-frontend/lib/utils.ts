// Reconstructed module. The original lib/utils was missing from the repository.
// Implementations are deterministic and avoid relying on Intl options, which the
// Hermes engine does not fully support on React Native.

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Format a number as a USD currency string, for example 1234.5 -> "$1,234.50"
 * and -42 -> "-$42.00".
 */
export function formatCurrency(amount: number): string {
  const value = Number.isFinite(amount) ? amount : 0;
  const negative = value < 0;
  const fixed = Math.abs(value).toFixed(2);
  const [intPart, decPart] = fixed.split(".");
  const withSeparators = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${negative ? "-" : ""}$${withSeparators}.${decPart}`;
}

/**
 * Format a date-like value as "Mon D, YYYY", for example "Jan 5, 2026".
 * Returns the original input as a string if it cannot be parsed.
 */
export function formatDate(input: string | number | Date): string {
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) {
    return String(input ?? "");
  }
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Return up to two uppercase initials from a name, for example
 * "Sarah Johnson" -> "SJ" and "madonna" -> "M".
 */
export function getInitials(name: string): string {
  if (!name) {
    return "";
  }
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}
