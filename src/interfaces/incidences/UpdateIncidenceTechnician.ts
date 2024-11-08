/**
 * Interface representing the data required to update the technician assigned to an incidence
 * @interface UpdateIncidenceTechnician
 * @property {number} technicianId - The identifier of the technician to be assigned to the incidence
 */

export interface UpdateIncidenceTechnician {
  technicianId: number;
}
