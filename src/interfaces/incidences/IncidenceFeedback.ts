/**
 * Interface representing feedback for an incident.
 * 
 * @interface IncidenceFeedback
 * @property {string} feedback - The textual feedback or comments provided by the user regarding the incident.
 * @property {number} rating - The rating given by the user, typically on a scale (e.g., 1-5) to assess the incident resolution.
 */
export interface IncidenceFeedback {
    feedback: string;
    rating: number;
}