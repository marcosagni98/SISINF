import { API_BASE_URL } from "../../config";
import { CreateWorklog } from "../../interfaces/incidences/CreateWorklog";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePostWithAuthBase from "../usePostWithAuthBase";


const usePostWorklog = () => {
  /** 
   * Destructure 'postData' from the custom 'usePostWithAuthBase' hook.
   * 'postData' is the function used to send POST requests with authentication.
   * It is generic, with 'GenericRespone' as the response type and 'CreateWorklog' as the request payload type.
   */
  const { postData } = usePostWithAuthBase<GenericRespone, CreateWorklog>();

  /** 
   * 'post' function: Accepts the worklog data and uses 'postData' to create a new worklog entry on the server.
   * It constructs the API endpoint URL dynamically to post the worklog data.
   * 
   * @param {CreateWorklog} data - The worklog data to be sent to the server.
   * @returns {Promise} - A promise that resolves with the response when the request is completed.
   */
  const post = (data: CreateWorklog) => {
    return postData(`${API_BASE_URL}/api/v1/WorkLog`, data);
  };

  return { post };
};

export default usePostWorklog;
