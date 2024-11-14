/**
 * Interface representing the data required to create feedback for an incident
 * @interface CreateFeedback
 * @property {number} incidentId - The unique identifier of the related incident
 * @property {string} feedback - The feedback text provided for the incident
 * @property {number} rating - The rating given for the incident, typically on a fixed scale
 */
export interface CreateFeedback {
  incidentId: number;
  feedback: string;
  rating: number;
}
