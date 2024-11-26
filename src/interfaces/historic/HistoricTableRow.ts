import { IncidencePriority } from "../../enums/incidencePriority";
import { IncidenceStatus } from "../../enums/incidenceStatus";

/**
 * Interface that represents a row of historical incident data in the table.
 * 
 * @interface HistoricTableRow
 * @property {number} id - The unique identifier for the historical incident.
 * @property {string} title - The title or short description of the incident.
 * @property {string} description - A detailed description of the incident.
 * @property {IncidencePriority} priority - The priority level of the incident, represented by an `IncidencePriority` enum.
 * @property {IncidenceStatus} status - The current status of the incident, represented by an `IncidenceStatus` enum.
 * @property {number} userId - The ID of the user who reported the incident.
 * @property {number} technicianId - The ID of the technician assigned to resolve the incident.
 */
export interface HistoricTableRow {
  id: number;
  title: string;
  description: string;
  priority: IncidencePriority;
  status: IncidenceStatus;
  userId: number;
  technicianId: number;
}
