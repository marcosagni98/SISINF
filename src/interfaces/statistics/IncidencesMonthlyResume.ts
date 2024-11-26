import { Dictionary } from "../shared/Dictionary";

/**
 * Represents a summary of incidences on a monthly basis.
 * 
 * @interface IncidencesMonthlyResume
 * @property {Dictionary<number>} incidencesByMonth - A dictionary object where the key is the month (in number format, e.g., 1 for January, 2 for February, etc.), 
 *                                                  and the value is the number of incidents that occurred in that month.
 * @property {number} changeRatioFromLastMonths - The percentage change in the number of incidents compared to the previous months.
 * @property {number} count - The total number of incidents reported in the current period (e.g., for the last year).
 */
export interface IncidencesMonthlyResume {
    incidencesByMonth: Dictionary<number>;
    changeRatioFromLastMonths: number;
    count: number;
}