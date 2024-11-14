import { API_BASE_URL } from "../../config";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePutWithAuthBase from "../usePutWithAuthBase";
import { UpdateIncidencePriority } from "../../interfaces/incidences/UpdateIncidencePriority";

const usePutIncidentPriority = () => {
  /** 
   * Destructure 'putData' from the custom 'usePutWithAuthBase' hook.
   * 'putData' is the function used to send PUT requests with authentication.
   * It is generic, with 'GenericRespone' as the response type and 'UpdateIncidencePriority' as the request payload type.
   */
  const { putData } =
    usePutWithAuthBase<GenericRespone, UpdateIncidencePriority>();

  /** 
   * 'put' function: Accepts an incidence ID and updated priority information, then uses 'putData' to send the updated priority to the server.
   * It constructs the API endpoint URL dynamically to update the priority of the specified incidence.
   * 
   * @param {number} id - The ID of the incidence to update.
   * @param {UpdateIncidencePriority} data - The updated incidence priority to be sent to the server.
   * @returns {Promise} - A promise that resolves with the response when the request is completed.
   */
  const put = (id: number, data: UpdateIncidencePriority) => {
    return putData(`${API_BASE_URL}/api/v1/Incident/update-priority/${id}`, data);
  };

  return { put };  
};

export default usePutIncidentPriority;
