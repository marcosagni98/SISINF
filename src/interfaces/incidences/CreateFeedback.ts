/**
 * Interface for creating feedback for an incident.
 * 
 * @interface CreateFeedback
 * @property {number} incidentId - The unique identifier of the incident that the feedback is related to.
 * @property {string} feedback - The text content of the feedback provided by the user.
 * @property {number} rating - The rating given to the incident resolution, typically on a scale (e.g., 1-5).
 */
export interface CreateFeedback {
  incidentId: number;
  feedback: string;
  rating: number;
}
