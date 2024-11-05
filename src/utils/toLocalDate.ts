export function toLocalDate(utcDateString: string): string {
  const utcDate = new Date(utcDateString);

  const localDate = new Date(
    utcDate.getTime() - utcDate.getTimezoneOffset() * 60 * 1000
  );

  return localDate.toLocaleString();
}
