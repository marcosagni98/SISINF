/**
 * Interface representing the count of incidents for a specific date
 * @interface IncidentCountByDate
 * @property {string} date - The date for which the incident count is recorded
 * @property {number} count - The number of incidents that occurred on the specified date
 */

export interface IncidentCountByDate {
    date: string; 
    count: number;
  }
  
  export type IncidentCountByDateArray = IncidentCountByDate[]; // Tipo para un array de estos objetos
  