export enum IncidenceStatus {
    Unassigned,
    Pending,
    InProgress,
    Review,
    Completed,
    Closed
}

export const incidenceStatusMap = new Map([
    [IncidenceStatus.Unassigned, "Sin asignar"],
    [IncidenceStatus.Pending, "Pendiente"],
    [IncidenceStatus.InProgress, "En progreso"],
    [IncidenceStatus.Review, "En revisión"],
    [IncidenceStatus.Completed, "Completada"],
    [IncidenceStatus.Closed, "Cerrada"],
  ]);
  