import { API_BASE_URL } from "../../config";
import { CreateFeedback } from "../../interfaces/incidences/CreateFeedback";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePostWithAuthBase from "../usePostWithAuthBase";

/** 
 * Custom hook to submit feedback with authentication
 * This hook simplifies the process of posting user feedback data to the API.
 * @returns {Object} - Contains the post function to send feedback data
 */
const usePostFeedback = () => {
  const { postData } = usePostWithAuthBase<GenericRespone, CreateFeedback>();

  /** 
   * Function to submit user feedback
   * @param {CreateFeedback} data - The feedback data to be submitted
   * @returns {Promise<any>} - Returns a promise with the response from the API after posting the feedback
   */
  const post = (data: CreateFeedback) => {
    return postData(`${API_BASE_URL}/api/v1/UserFeedback`, data);
  };

  return { post };
};

export default usePostFeedback;
