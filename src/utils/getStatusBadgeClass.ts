import { IncidenceStatus } from "../enums/incidenceStatus";

/**
 * Returns a Bootstrap badge class based on the status of an incidence.
 * Maps each status level to a corresponding badge color.
 *
 * @param status - The status of the incidence (InProgress, Completed, Pending, etc.).
 * @returns A string representing the Bootstrap badge class.
 */
export function getStatusBadgeClass(status: IncidenceStatus): string {
  switch (status) {
    case IncidenceStatus.InProgress:
      return "badge-warning text-dark";
    case IncidenceStatus.Completed:
      return "badge-success";
    case IncidenceStatus.Pending:
      return "badge-secondary";
    case IncidenceStatus.Closed:
      return "badge-danger";
    case IncidenceStatus.Review:
      return "badge-info";
    default:
      return "badge-light";
  }
}
