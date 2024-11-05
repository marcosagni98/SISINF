import { IncidencePriority } from "../enums/incidencePriority";

export function getPriorityBadgeClass(priority: IncidencePriority): string {
    switch (priority) {
      case IncidencePriority.High:
        return "badge-danger";
      case IncidencePriority.Medium:
        return "badge-warning text-dark";
      case IncidencePriority.Low:
        return "badge-success";
      default:
        return "badge-light";
    }
  }