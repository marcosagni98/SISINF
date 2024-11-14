import { IncidencePriority } from "../../enums/incidencePriority";
import { IncidenceStatus } from "../../enums/incidenceStatus";
/**
 * Interface representing a row in the incidences table
 * @interface IncidencesTableRow
 * @property {number} id - The unique identifier for the incidence
 * @property {string} title - The title of the incidence
 * @property {IncidenceStatus} status - The current status of the incidence
 * @property {IncidencePriority} priority - The priority level of the incidence
 * @property {string} assignedTo - The name of the person the incidence is assigned to
 */


export interface IncidencesTableRow {
    id: number;
    title: string;
    status: IncidenceStatus;
    priority: IncidencePriority;
    assignedTo: string;
}