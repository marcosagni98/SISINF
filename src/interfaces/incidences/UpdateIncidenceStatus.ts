import { IncidenceStatus } from "../../enums/incidenceStatus";

/**
 * Interface representing the data required to update the status of an incident.
 * 
 * @interface UpdateIncidenceStatus
 * @property {IncidenceStatus} statusId - The new status of the incident, defined as an enum value.
 * @property {number} changedBy - The ID of the user making the status change.
 * @property {string} resolutionDetails - Additional details or comments regarding the status update, such as resolution steps.
 */
export interface UpdateIncidenceStatus {
  statusId: IncidenceStatus;
  changedBy: number;
  resolutionDetails: string;
}
