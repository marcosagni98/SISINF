import { API_BASE_URL } from "../../config";
import { IncidenceDescription } from "../../interfaces/incidences/IncidenceDescription";
import usePostWithAuthBase from "../usePostWithAuthBase";
import { Response } from "../../interfaces/shared/Response";

/** 
   * Destructure 'postData' from the custom 'usePostWithAuthBase' hook.
   * 'postData' is the function used to send POST requests with authentication.
   * It is generic, with 'GenericRespone' as the response type and 'CreateIncidence' as the request payload type.
   */
const usePostDescriptionIA = () => {
  const { postData } = usePostWithAuthBase<Response, IncidenceDescription>();

  /** 
   * 'post' function: Accepts the incidence data and uses 'postData' to create a new incidence on the server.
   * It constructs the API endpoint URL dynamically to post the incidence data.
   * 
   * @param {CreateIncidence} data - The incidence data to be sent to the server.
   * @returns {Promise} - A promise that resolves with the response when the request is completed.
   */
  const post = (data: IncidenceDescription) => {
    return postData(`${API_BASE_URL}/api/Ollama/improve-description`, data);
  };

  return { post };
};

export default usePostDescriptionIA;
