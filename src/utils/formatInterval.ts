/**
 * Formats a given time interval in minutes into a readable string.
 * Converts the interval into days, hours, and minutes.
 *
 * @param minutes - The total number of minutes to format.
 * @returns A formatted string like "2 días 3 horas 15 minutos".
 * If the input is invalid or negative, returns an empty string.
 */
export function formatInterval(minutes: number): string {
  // Validate input: must be a non-negative number
  if (typeof minutes !== "number" || isNaN(minutes) || minutes < 0) {
    return "";
  }

  // Calculate days, hours, and remaining minutes
  const days = Math.floor(minutes / (24 * 60));
  let remainingMinutes = minutes % (24 * 60);

  const hours = Math.floor(remainingMinutes / 60);
  remainingMinutes = remainingMinutes % 60;

  const parts = [];

  // Add days to the output if applicable
  if (days > 0) {
    parts.push(days + " " + (days === 1 ? "día" : "días"));
  }

  // Add hours to the output if applicable
  if (hours > 0) {
    parts.push(hours + " " + (hours === 1 ? "hora" : "horas"));
  }

  // Add minutes to the output, or include it if it's the only part
  if (remainingMinutes > 0 || parts.length === 0) {
    parts.push(
      remainingMinutes + " " + (remainingMinutes === 1 ? "minuto" : "minutos")
    );
  }

  // Join the parts into a single formatted string
  return parts.join(" ");
}
