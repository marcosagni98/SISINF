export enum IncidencePriority {
  Low,
  Medium,
  High,
}

export const incidencePriorityMap = new Map([
  [IncidencePriority.Low, "Baja"],
  [IncidencePriority.Medium, "Media"],
  [IncidencePriority.High, "Alta"],
]);
