import { IncidencePriority } from "../../enums/incidencePriority";
/**
 * Interface representing the data required to create a new incidence
 * @interface CreateIncidence
 * @property {string} title - The title of the incidence
 * @property {string} description - Detailed description of the incidence
 * @property {IncidencePriority | null} priority - The priority level of the incidence; can be null if not specified
 */

export interface CreateIncidence {
  title: string;
  description: string;
  priority: IncidencePriority | null;
}
