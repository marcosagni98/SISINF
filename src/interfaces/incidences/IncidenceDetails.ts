import { IncidencePriority } from "../../enums/incidencePriority";
import { IncidenceStatus } from "../../enums/incidenceStatus";

/**
 * Interface for the details of an incident.
 * 
 * @interface IncidenceDetails
 * @property {number} id - The unique identifier of the incident.
 * @property {string} title - The title of the incident, summarizing the issue.
 * @property {string} description - A detailed description of the incident, outlining the nature of the issue.
 * @property {IncidencePriority} priority - The priority level of the incident, indicating its urgency.
 * @property {IncidenceStatus} status - The current status of the incident, such as open, in-progress, or resolved.
 * @property {string} createdAt - The timestamp of when the incident was created.
 * @property {number} userId - The ID of the user who reported or is affected by the incident.
 * @property {string} userName - The name of the user associated with the incident.
 * @property {number | null} technicianId - The ID of the technician assigned to resolve the incident. It can be `null` if no technician is assigned.
 * @property {string} technicianName - The name of the technician handling the incident. This can be an empty string if no technician is assigned.
 */
export interface IncidenceDetails {
    id: number;
    title: string;
    description: string;
    priority: IncidencePriority;
    status: IncidenceStatus;
    createdAt: string;
    userId: number;
    userName: string;
    technicianId: number | null;
    technicianName: string;
}