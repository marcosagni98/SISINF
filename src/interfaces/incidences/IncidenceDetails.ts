import { IncidencePriority } from "../../enums/incidencePriority";
import { IncidenceStatus } from "../../enums/incidenceStatus";
/**
 * Interface representing detailed information of an incidence
 * @interface IncidenceDetails
 * @property {number} id - The unique identifier for the incidence
 * @property {string} title - The title of the incidence
 * @property {string} description - Detailed description of the incidence
 * @property {IncidencePriority} priority - The priority level of the incidence
 * @property {IncidenceStatus} status - The current status of the incidence
 * @property {string} createdAt - The date and time when the incidence was created, in ISO format
 * @property {number} userId - The identifier of the user who reported the incidence
 * @property {string} userName - The full name of the user who reported the incidence
 * @property {number | undefined} technicianId - The identifier of the technician assigned to handle the incidence, or undefined if not assigned
 * @property {string} technicianName - The full name of the technician assigned to the incidence
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