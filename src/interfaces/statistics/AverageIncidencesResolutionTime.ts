/**
 * Interface representing the average resolution time for incidences
 * @interface AverageIncidencesResolutionTime
 * @property {number} avgTimeMin - The average time taken to resolve incidences, in minutes
 * @property {number} changeRatioFromLastMonth - The ratio of change in the average resolution time compared to the previous month
 */

export interface AverageIncidencesResolutionTime {
  avgTimeMin: number;
  changeRatioFromLastMonth: number;
}
