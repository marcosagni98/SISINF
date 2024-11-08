/**
 * Interface representing a work log entry for an incidence
 * @interface IncidenceWorkLog
 * @property {string} technicianName - The name of the technician who worked on the incidence
 * @property {number} minWorked - The number of minutes worked on the incidence
 * @property {string} logDate - The date when the work was logged
 */

export interface IncidenceWorkLog {
    technicianName: string;
    minWorked: number;
    logDate: string;
}