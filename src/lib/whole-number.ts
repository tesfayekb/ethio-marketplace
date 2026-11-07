/**
 * A typed number parse: a whole number, or null when the field is blank or not
 * a number. Never a sentinel 0.
 */
export function wholeNumber(raw: string): number | null {
  const text = raw.trim();
  if (!/^-?\d+$/.test(text)) return null;
  return Number(text);
}
