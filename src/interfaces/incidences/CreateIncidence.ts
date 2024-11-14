import { IncidencePriority } from "../../enums/incidencePriority";

/**
 * Interface for creating a new incidence.
 * 
 * @interface CreateIncidence
 * @property {string} title - The title or subject of the incident being created.
 * @property {string} description - A detailed description of the incident, explaining the issue or situation.
 * @property {IncidencePriority | null} priority - The priority level of the incident (e.g., high, medium, low). 
 *    Can be null if the priority is not yet assigned or determined.
 */
export interface CreateIncidence {
  title: string;
  description: string;
  priority: IncidencePriority | null;
}
