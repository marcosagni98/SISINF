import { IncidencePriority } from "../../enums/incidencePriority";
import { IncidenceStatus } from "../../enums/incidenceStatus";

/**
 * Interface representing a summary row of an incidence in a table.
 * 
 * @interface IncidencesTableRow
 * @property {number} id - The unique identifier for the incident.
 * @property {string} title - The title or name of the incident.
 * @property {IncidenceStatus} status - The current status of the incident (e.g., Open, In Progress, Resolved).
 * @property {IncidencePriority} priority - The priority level of the incident (e.g., Low, Medium, High).
 * @property {string} technicianName - The name of the person (technician or user) the incident is assigned to.
 */
export interface IncidencesTableRow {
    id: number;
    title: string;
    status: IncidenceStatus;
    priority: IncidencePriority;
    technicianName: string;
}