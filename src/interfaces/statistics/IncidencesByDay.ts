/**
 * Represents the count of incidents on a specific date.
 * 
 * @interface IncidentCountByDate
 * @property {string} date - The date for which the incident count is reported, in ISO 8601 format (e.g., "2024-11-14").
 * @property {number} count - The number of incidents reported on the given date.
 */
export interface IncidentCountByDate {
  date: string; 
  count: number;
}

/**
 * A collection of incident counts for multiple dates.
 * 
 * @type IncidentCountByDateArray
 * @description An array of `IncidentCountByDate` objects, each representing the number of incidents on a specific date.
 */
export type IncidentCountByDateArray = IncidentCountByDate[]; 