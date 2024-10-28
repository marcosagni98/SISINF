export function formatInterval(minutes: number): string {
  if (typeof minutes !== "number" || isNaN(minutes) || minutes < 0) {
    return "";
  }

  const days = Math.floor(minutes / (24 * 60));
  let remainingMinutes = minutes % (24 * 60);

  const hours = Math.floor(remainingMinutes / 60);
  remainingMinutes = remainingMinutes % 60;

  const parts = [];

  if (days > 0) {
    parts.push(days + " " + (days === 1 ? "día" : "días"));
  }

  if (hours > 0) {
    parts.push(hours + " " + (hours === 1 ? "hora" : "horas"));
  }

  if (remainingMinutes > 0 || parts.length === 0) {
    parts.push(
      remainingMinutes + " " + (remainingMinutes === 1 ? "minuto" : "minutos")
    );
  }

  return parts.join(" ");
}
