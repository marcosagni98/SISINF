/**
 * Interface representing the data required to log work on an incident
 * @interface CreateWorklog
 * @property {number} incidentId - The unique identifier of the related incident
 * @property {number} minWorked - The number of minutes worked on the incident
 */
export interface CreateWorklog {
  incidentId: number;
  minWorked: number;
}
