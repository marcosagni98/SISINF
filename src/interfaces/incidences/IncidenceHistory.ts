import { IncidenceStatus } from "../../enums/incidenceStatus";
/**
 * Interface representing the history of status changes for an incidence
 * @interface IncidenceHistory
 * @property {IncidenceStatus} status - The status of the incidence after the change
 * @property {string} changedAt - The date and time when the status change occurred, in ISO format
 * @property {number} changedBy - The identifier of the user who made the status change
 * @property {string} changedByUserName - The full name of the user who made the status change
 * @property {string} resolutionDetails - Additional details or notes related to the resolution of the incidence
 */


export interface IncidenceHistory {
    status: IncidenceStatus;
    changedAt: string;
    changedBy: number;
    changedByUserName: string;
    resolutionDetails: string;
}