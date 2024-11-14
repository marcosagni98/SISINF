import { IncidencePriority } from "../../enums/incidencePriority";
/**
 * Interface representing the data required to update the priority of an incidence
 * @interface UpdateIncidencePriority
 * @property {IncidencePriority} priorityId - The new priority level for the incidence
 */

export interface UpdateIncidencePriority {
  priorityId: IncidencePriority;
}
