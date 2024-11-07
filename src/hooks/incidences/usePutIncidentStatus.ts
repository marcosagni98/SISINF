import { API_BASE_URL } from "../../config";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import { UpdateIncidenceStatus } from "../../interfaces/incidences/UpdateIncidenceStatus";
import usePutWithAuthBase from "../usePutWithAuthBase";

/** 
 * Custom hook to update the status of an existing incidence with authentication
 * This hook facilitates updating the status of a specific incidence.
 * @returns {Object} - Contains the put function to submit the updated status for the incidence
 */
const usePutIncidentStatus = () => {
  const { putData } = usePutWithAuthBase<GenericRespone, UpdateIncidenceStatus>();

  /** 
   * Function to update the status of an incidence
   * @param {number} id - The ID of the incidence to be updated
   * @param {UpdateIncidenceStatus} data - The new status information for the incidence
   * @returns {Promise<any>} - Returns a promise with the response from the API after updating the incidence status
   */
  const put = (id: number, data: UpdateIncidenceStatus) => {
    return putData(`${API_BASE_URL}/api/v1/Incident/update-status/${id}`, data);
  };

  return { put };  
};

export default usePutIncidentStatus;
