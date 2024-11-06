/**
 * Interface representing the resolution of incidents on a specific date.
 * 
 * @param {string} date - The date when the resolved incidents were recorded, in ISO format (YYYY-MM-DD).
 * @param {number} count - The number of incidents resolved on that date.
 */
export interface IncidencesResolution {
    date: string;
    count: number;
}
  