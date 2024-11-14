import { IncidenceStatus } from "../../enums/incidenceStatus";

/**
 * Interface representing the history of status changes for an incident.
 * 
 * @interface IncidenceHistory
 * @property {IncidenceStatus} status - The new status of the incident after the change (e.g., Open, In Progress, Resolved).
 * @property {string} changedAt - The timestamp of when the status change occurred.
 * @property {number} changedBy - The ID of the user who made the change.
 * @property {string} changedByUserName - The username of the person who made the change.
 * @property {string} resolutionDetails - Additional details explaining the resolution or actions taken during the status change.
 */
export interface IncidenceHistory {
    status: IncidenceStatus;
    changedAt: string;
    changedBy: number;
    changedByUserName: string;
    resolutionDetails: string;
}