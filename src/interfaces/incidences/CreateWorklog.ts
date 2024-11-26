/**
 * Interface for creating a worklog entry for an incident.
 * 
 * @interface CreateWorklog
 * @property {number} incidentId - The unique identifier of the incident that the worklog entry is associated with.
 * @property {number} minWorked - The number of minutes worked on the incident. This value represents the time spent addressing or resolving the incident.
 */
export interface CreateWorklog {
  incidentId: number;
  minWorked: number;
}
