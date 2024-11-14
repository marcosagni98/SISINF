import { API_BASE_URL } from "../../config";
import { CreateFeedback } from "../../interfaces/incidences/CreateFeedback";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePostWithAuthBase from "../usePostWithAuthBase";

const usePostFeedback = () => {
  /** 
   * Destructure 'postData' from the custom 'usePostWithAuthBase' hook.
   * 'postData' is the function used to send POST requests with authentication.
   * It is generic, with 'GenericRespone' as the response type and 'CreateFeedback' as the request payload type.
   */
  const { postData } = usePostWithAuthBase<GenericRespone, CreateFeedback>();

  /** 
   * 'post' function: Accepts the feedback data and uses 'postData' to send the feedback to the server.
   * It constructs the API endpoint URL dynamically to post the feedback data.
   * 
   * @param {CreateFeedback} data - The feedback data to be sent to the server.
   * @returns {Promise} - A promise that resolves with the response when the request is completed.
   */
  const post = (data: CreateFeedback) => {
    return postData(`${API_BASE_URL}/api/v1/UserFeedback`, data);
  };

  return { post };
};

export default usePostFeedback;
