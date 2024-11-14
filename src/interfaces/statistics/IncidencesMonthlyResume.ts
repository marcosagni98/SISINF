import { Dictionary } from "../shared/Dictionary";
/**
 * Interface representing a summary of incidences for a specific month
 * @interface IncidencesMonthlyResume
 * @property {Dictionary<number>} incidencesByMonth - A dictionary where the key is the month (e.g., "January", "February") and the value is the count of incidences for that month
 * @property {number} changeRatioFromLastMonths - The ratio of change in incidences compared to the previous months
 * @property {number} count - The total count of incidences for the current month
 */

export interface IncidencesMonthlyResume {
    incidencesByMonth: Dictionary<number>;
    changeRatioFromLastMonths: number;
    count: number;
}