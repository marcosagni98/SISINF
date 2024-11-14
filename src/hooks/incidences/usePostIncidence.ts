import { API_BASE_URL } from "../../config";
import { CreateIncidence } from "../../interfaces/incidences/CreateIncidence";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePostWithAuthBase from "../usePostWithAuthBase";

/** 
 * Custom hook to create a new incidence with authentication
 * This hook simplifies the process of posting new incidence data to the API.
 * @returns {Object} - Contains the post function to submit incidence data
 */
const usePostIncidence = () => {
  const { postData } = usePostWithAuthBase<GenericRespone, CreateIncidence>();

  /** 
   * Function to submit a new incidence
   * @param {CreateIncidence} data - The incidence data to be submitted
   * @returns {Promise<any>} - Returns a promise with the response from the API after posting the incidence
   */
  const post = (data: CreateIncidence) => {
    return postData(`${API_BASE_URL}/api/v1/Incident`, data);
  };

  return { post };
};

export default usePostIncidence;
