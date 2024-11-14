import { API_BASE_URL } from "../../config";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePutWithAuthBase from "../usePutWithAuthBase";
import { UpdateIncidenceTechnician } from "../../interfaces/incidences/UpdateIncidenceTechnician";

const usePutIncidentTechnician = () => {
  /** 
   * Destructure 'putData' from the custom 'usePutWithAuthBase' hook.
   * 'putData' is the function used to send PUT requests with authentication.
   * It is generic, with 'GenericRespone' as the response type and 'UpdateIncidenceTechnician' as the request payload type.
   */
  const { putData } =
    usePutWithAuthBase<GenericRespone, UpdateIncidenceTechnician>();

    /** 
   * 'put' function: Accepts an incidence ID and updated technician information, then uses 'putData' to send the updated technician assignment to the server.
   * It constructs the API endpoint URL dynamically to set the technician for the specified incidence.
   * 
   * @param {number} id - The ID of the incidence to update.
   * @param {UpdateIncidenceTechnician} data - The updated technician information to be sent to the server.
   * @returns {Promise} - A promise that resolves with the response when the request is completed.
   */
  const put = (id: number, data: UpdateIncidenceTechnician) => {
    return putData(`${API_BASE_URL}/api/v1/Incident/set-technician/${id}`, data);
  };

  return { put };  
};

export default usePutIncidentTechnician;
