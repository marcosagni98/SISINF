import { API_BASE_URL } from "../../config";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePutWithAuthBase from "../usePutWithAuthBase";
import { UpdateIncidencePriority } from "../../interfaces/incidences/UpdateIncidencePriority";

/** 
 * Custom hook to update the priority of an existing incidence with authentication
 * This hook allows updating the priority of a specific incidence.
 * @returns {Object} - Contains the put function to submit the updated priority for the incidence
 */
const usePutIncidentPriority = () => {
  const { putData } = usePutWithAuthBase<GenericRespone, UpdateIncidencePriority>();

  /** 
   * Function to update the priority of an incidence
   * @param {number} id - The ID of the incidence to be updated
   * @param {UpdateIncidencePriority} data - The new priority information for the incidence
   * @returns {Promise<any>} - Returns a promise with the response from the API after updating the incidence priority
   */
  const put = (id: number, data: UpdateIncidencePriority) => {
    return putData(`${API_BASE_URL}/api/v1/Incident/update-priority/${id}`, data);
  };

  return { put };  
};

export default usePutIncidentPriority;
