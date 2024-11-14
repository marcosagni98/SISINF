import { API_BASE_URL } from "../../config";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePutWithAuthBase from "../usePutWithAuthBase";
import { UpdateIncidenceInfo } from "../../interfaces/incidences/UpdateIncidenceInfo";

const usePutIncidentInfo = () => {

  /** 
   * Destructure 'putData' from the custom 'usePutWithAuthBase' hook.
   * 'putData' is the function used to send PUT requests with authentication.
   * It is generic, with 'GenericRespone' as the response type and 'UpdateIncidenceInfo' as the request payload type.
   */
  const { putData } =
    usePutWithAuthBase<GenericRespone, UpdateIncidenceInfo>();

  /** 
   * 'put' function: Accepts an incidence ID and updated information, then uses 'putData' to send the updated incidence info to the server.
   * It constructs the API endpoint URL dynamically to update the title and description of the specified incidence.
   * 
   * @param {number} id - The ID of the incidence to update.
   * @param {UpdateIncidenceInfo} data - The updated incidence information (title, description, etc.) to be sent to the server.
   * @returns {Promise} - A promise that resolves with the response when the request is completed.
   */
  const put = (id: number, data: UpdateIncidenceInfo) => {
    return putData(`${API_BASE_URL}/api/v1/Incident/update-title-description/${id}`, data);
  };

  return { put };  
};

export default usePutIncidentInfo;
