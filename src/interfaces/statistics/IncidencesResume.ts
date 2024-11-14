/**
 * Represents a summary of incidences with counts for their current statuses.
 * 
 * @interface IncidencesResume
 * @property {number} openedIncidences - The total number of incidents that are currently open (not yet resolved or closed).
 * @property {number} closedIncidences - The total number of incidents that have been resolved or closed.
 * @property {number} unassignedIncidences - The total number of incidents that have not yet been assigned to a technician.
 */
export interface IncidencesResume {
    openedIncidences: number;
    closedIncidences: number;
    unassignedIncidences: number;
}