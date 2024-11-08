/**
 * Interface representing the user happiness metrics
 * @interface UserHappiness
 * @property {number} happinessRatio - The current happiness ratio of the user
 * @property {number} changeRatioFromLastMonth - The ratio of change in the happiness ratio compared to the previous month
 */

export interface UserHappiness {
  happinessRatio: number;
  changeRatioFromLastMonth: number;
}
