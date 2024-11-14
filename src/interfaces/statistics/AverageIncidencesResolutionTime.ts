/**
 * Represents the average resolution time for incidences and the change in resolution 
 * time compared to the previous month.
 * 
 * @interface AverageIncidencesResolutionTime
 * @property {number} avgTimeMin - The average resolution time for incidences in minutes.
 * @property {number} changeRatioFromLastMonth - The percentage change in the average resolution time compared to the previous month.
 */
export interface AverageIncidencesResolutionTime {
  avgTimeMin: number;
  changeRatioFromLastMonth: number;
}
