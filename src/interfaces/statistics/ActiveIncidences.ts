/**
 * Interface representing the statistics of active incidences
 * @interface ActiveIncidences
 * @property {number} total - The total number of active incidences
 * @property {number} high - The number of active incidences with high priority
 * @property {number} medium - The number of active incidences with medium priority
 * @property {number} low - The number of active incidences with low priority
 * @property {number} variationFromLastMonth - The variation in the number of active incidences compared to the previous month
 */

export interface ActiveIncidences {
  total: number;
  high: number;
  medium: number;
  low: number;
  variationFromLastMonth: number;
}
