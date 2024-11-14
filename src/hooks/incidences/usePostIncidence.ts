import { API_BASE_URL } from "../../config";
import { CreateIncidence } from "../../interfaces/incidences/CreateIncidence";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePostWithAuthBase from "../usePostWithAuthBase";

/** 
   * Destructure 'postData' from the custom 'usePostWithAuthBase' hook.
   * 'postData' is the function used to send POST requests with authentication.
   * It is generic, with 'GenericRespone' as the response type and 'CreateIncidence' as the request payload type.
   */
const usePostIncidence = () => {
  const { postData } = usePostWithAuthBase<GenericRespone, CreateIncidence>();

  /** 
   * 'post' function: Accepts the incidence data and uses 'postData' to create a new incidence on the server.
   * It constructs the API endpoint URL dynamically to post the incidence data.
   * 
   * @param {CreateIncidence} data - The incidence data to be sent to the server.
   * @returns {Promise} - A promise that resolves with the response when the request is completed.
   */
  const post = (data: CreateIncidence) => {
    return postData(`${API_BASE_URL}/api/v1/Incident`, data);
  };

  return { post };
};

export default usePostIncidence;
