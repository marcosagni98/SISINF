import { IncidencePriority } from "../../enums/incidencePriority";

/**
 * Interface representing the data required to update the priority of an incident.
 * 
 * @interface UpdateIncidencePriority
 * @property {IncidencePriority} priorityId - The new priority level of the incident, defined as an enum value.
 */
export interface UpdateIncidencePriority {
  priorityId: IncidencePriority;
}
