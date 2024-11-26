/**
 * Represents the current active incidences and their priority levels, along with
 * the variation from the previous month.
 * 
 * @interface ActiveIncidences
 * @property {number} total - The total number of active incidences.
 * @property {number} high - The count of incidences with high priority.
 * @property {number} medium - The count of incidences with medium priority.
 * @property {number} low - The count of incidences with low priority.
 * @property {number} variationFromLastMonth - The percentage change in the number of incidences compared to last month.
 */
export interface ActiveIncidences {
  total: number;
  high: number;
  medium: number;
  low: number;
  variationFromLastMonth: number;
}
