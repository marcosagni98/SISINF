import { API_BASE_URL } from "../../config";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePutWithAuthBase from "../usePutWithAuthBase";
import { UpdateIncidenceTechnician } from "../../interfaces/incidences/UpdateIncidenceTechnician";

/** 
 * Custom hook to assign or update the technician for an existing incidence with authentication
 * This hook simplifies the process of assigning a technician to a specific incidence.
 * @returns {Object} - Contains the put function to submit the technician assignment to the incidence
 */
const usePutIncidentTechnician = () => {
  const { putData } = usePutWithAuthBase<GenericRespone, UpdateIncidenceTechnician>();

  /** 
   * Function to assign a technician to an incidence
   * @param {number} id - The ID of the incidence to be updated
   * @param {UpdateIncidenceTechnician} data - The technician data to assign to the incidence
   * @returns {Promise<any>} - Returns a promise with the response from the API after assigning the technician
   */
  const put = (id: number, data: UpdateIncidenceTechnician) => {
    return putData(`${API_BASE_URL}/api/v1/Incident/set-technician/${id}`, data);
  };

  return { put };  
};

export default usePutIncidentTechnician;
