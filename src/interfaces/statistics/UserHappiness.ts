/**
 * Represents the user happiness statistics based on feedback or survey results.
 * 
 * @interface UserHappiness
 * @property {number} happinessRatio - A value representing the current level of user happiness, typically on a scale (e.g., 0 to 100 or 0 to 1).
 * @property {number} changeRatioFromLastMonth - The percentage change in user happiness compared to the previous month, indicating trends in user satisfaction.
 */
export interface UserHappiness {
  happinessRatio: number;
  changeRatioFromLastMonth: number;
}
