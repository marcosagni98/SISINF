/**
 * Interface representing the data required to update the basic information of an incident.
 * 
 * @interface UpdateIncidenceInfo
 * @property {string} title - The new title of the incident.
 * @property {string} description - The new description providing details about the incident.
 */
export interface UpdateIncidenceInfo {
  title: string;
  description: string;
}
