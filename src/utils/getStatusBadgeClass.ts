import { IncidenceStatus } from "../enums/incidenceStatus";

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
