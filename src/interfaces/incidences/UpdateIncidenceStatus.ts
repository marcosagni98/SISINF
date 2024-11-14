import { IncidenceStatus } from "../../enums/incidenceStatus";
/**
 * Interface representing the data required to update the status of an incidence
 * @interface UpdateIncidenceStatus
 * @property {IncidenceStatus} statusId - The new status for the incidence
 * @property {number} changedBy - The identifier of the user who changed the status
 * @property {string} resolutionDetails - Details regarding the resolution or changes made to the incidence
 */

export interface UpdateIncidenceStatus {
  statusId: IncidenceStatus;
  changedBy: number;
  resolutionDetails: string;
}
