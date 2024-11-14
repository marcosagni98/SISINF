import { API_BASE_URL } from "../../config";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePutWithAuthBase from "../usePutWithAuthBase";
import { UpdateIncidenceInfo } from "../../interfaces/incidences/UpdateIncidenceInfo";

/** 
 * Custom hook to update the information (title and description) of an existing incidence with authentication
 * This hook provides a simple way to update the title and description of a specific incidence.
 * @returns {Object} - Contains the put function to submit the updated incidence information
 */
const usePutIncidentInfo = () => {
  const { putData } = usePutWithAuthBase<GenericRespone, UpdateIncidenceInfo>();

  /** 
   * Function to update the title and description of an incidence
   * @param {number} id - The ID of the incidence to be updated
   * @param {UpdateIncidenceInfo} data - The new information (title and description) to update the incidence with
   * @returns {Promise<any>} - Returns a promise with the response from the API after updating the incidence
   */
  const put = (id: number, data: UpdateIncidenceInfo) => {
    return putData(`${API_BASE_URL}/api/v1/Incident/update-title-description/${id}`, data);
  };

  return { put };  
};

export default usePutIncidentInfo;
