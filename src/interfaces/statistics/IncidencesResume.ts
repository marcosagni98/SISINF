/**
 * Interface representing a summary of incidences status
 * @interface IncidencesResume
 * @property {number} openedIncidences - The total number of incidences that are currently open
 * @property {number} closedIncidences - The total number of incidences that have been closed
 * @property {number} unassignedIncidences - The total number of incidences that are not yet assigned to a technician
 */

export interface IncidencesResume {
    openedIncidences: number;
    closedIncidences: number;
    unassignedIncidences: number;
}