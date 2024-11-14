/**
 * Interface representing a work log entry for an incident.
 * 
 * @interface IncidenceWorkLog
 * @property {string} technicianName - The name of the technician who worked on the incident.
 * @property {number} minWorked - The number of minutes the technician spent working on the incident.
 * @property {string} logDate - The date when the work was logged, in ISO string format.
 */
export interface IncidenceWorkLog {
    technicianName: string;
    minWorked: number;
    logDate: string;
}