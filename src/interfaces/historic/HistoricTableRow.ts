import { IncidencePriority } from "../../enums/incidencePriority";
import { IncidenceStatus } from "../../enums/incidenceStatus";

/**
 * Interface representing a row in the historic table for incidences
 * @interface HistoricTableRow
 * @property {number} id - The unique identifier for the incidence
 * @property {string} title - The title of the incidence
 * @property {string} description - Detailed description of the incidence
 * @property {IncidencePriority} priority - The priority level of the incidence
 * @property {IncidenceStatus} status - The current status of the incidence
 * @property {number} userId - The identifier of the user who reported the incidence
 * @property {number} technicianId - The identifier of the technician assigned to handle the incidence
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
