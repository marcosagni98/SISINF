/**
 * Interface representing the data required to update an incidence's information
 * @interface UpdateIncidenceInfo
 * @property {string} title - The updated title of the incidence
 * @property {string} description - The updated detailed description of the incidence
 */

export interface UpdateIncidenceInfo {
  title: string;
  description: string;
}
