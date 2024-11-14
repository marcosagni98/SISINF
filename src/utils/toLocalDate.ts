/**
 * Converts a UTC date string to a localized date and time string.
 * Adjusts for the local timezone offset to ensure correct display.
 *
 * @param utcDateString - The date string in UTC format.
 * @returns A string representing the localized date and time.
 */
export function toLocalDate(utcDateString: string): string {
  // Parse the input UTC date string into a Date object
  const utcDate = new Date(utcDateString);

  // Adjust the date to the local timezone
  const localDate = new Date(
    utcDate.getTime() - utcDate.getTimezoneOffset() * 60 * 1000
  );

  // Return the localized date and time string
  return localDate.toLocaleString();
}
