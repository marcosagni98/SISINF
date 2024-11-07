import { API_BASE_URL } from "../../config";
import { CreateWorklog } from "../../interfaces/incidences/CreateWorklog";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePostWithAuthBase from "../usePostWithAuthBase";

/** 
 * Custom hook to create a new worklog entry with authentication
 * This hook simplifies the process of posting new worklog data to the API.
 * @returns {Object} - Contains the post function to submit worklog data
 */
const usePostWorklog = () => {
  const { postData } = usePostWithAuthBase<GenericRespone, CreateWorklog>();

  /** 
   * Function to submit a new worklog entry
   * @param {CreateWorklog} data - The worklog data to be submitted
   * @returns {Promise<any>} - Returns a promise with the response from the API after posting the worklog
   */
  const post = (data: CreateWorklog) => {
    return postData(`${API_BASE_URL}/api/v1/WorkLog`, data);
  };

  return { post };
};

export default usePostWorklog;
