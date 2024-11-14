import { API_BASE_URL } from "../../config";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import { UpdateIncidenceStatus } from "../../interfaces/incidences/UpdateIncidenceStatus";
import usePutWithAuthBase from "../usePutWithAuthBase";

  /** 
   * Destructure 'putData' from the custom 'usePutWithAuthBase' hook.
   * 'putData' is the function used to send PUT requests with authentication.
   * It is generic, with 'GenericRespone' as the response type and 'UpdateIncidenceStatus' as the request payload type.
   */
const usePutIncidentStatus = () => {
  const { putData } =
    usePutWithAuthBase<GenericRespone, UpdateIncidenceStatus>();

  /** 
   * 'put' function: Accepts an incidence ID and updated status information, then uses 'putData' to send the updated status to the server.
   * It constructs the API endpoint URL dynamically to update the status of the specified incidence.
   * 
   * @param {number} id - The ID of the incidence to update.
   * @param {UpdateIncidenceStatus} data - The updated incidence status to be sent to the server.
   * @returns {Promise} - A promise that resolves with the response when the request is completed.
   */
  const put = (id: number, data: UpdateIncidenceStatus) => {
    return putData(`${API_BASE_URL}/api/v1/Incident/update-status/${id}`, data);
  };

  return { put };  
};

export default usePutIncidentStatus;
