/**
 * Interface representing the data required to assign or update the technician for an incident.
 * 
 * @interface UpdateIncidenceTechnician
 * @property {number} technicianId - The ID of the technician being assigned to or updated on the incident.
 */
export interface UpdateIncidenceTechnician {
  technicianId: number;
}
