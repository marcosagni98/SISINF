import { IncidencePriority } from "../enums/incidencePriority";

/**
 * Returns a Bootstrap badge class based on the priority of an incidence.
 * Maps each priority level to a corresponding badge color.
 *
 * @param priority - The priority level of the incidence (High, Medium, Low).
 * @returns A string representing the Bootstrap badge class.
 */
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
