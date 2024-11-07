import { API_BASE_URL } from "../../config";
import { RecoverPassword } from "../../interfaces/auth/RecoverPassword";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePostBase from "../usePostBase";

/** 
 * Custom hook to handle the recover password POST request
 * This hook provides an easy way to make a POST request to the forgot-password endpoint.
 * @returns {Object} - Contains a post function to perform the password recovery request
 */
const usePostRecoverPassword = () => {
  const { postData } = usePostBase<GenericRespone, RecoverPassword>();

  /** 
   * Function to perform the password recovery POST request
   * @param {RecoverPassword} data - The data required for the password recovery process
   * @returns {Promise<GenericRespone>} - Returns a promise with the response for the password recovery request
   */
  const post = (data: RecoverPassword) => {
    return postData(`${API_BASE_URL}/api/v1/Auth/forgot-password`, data);
  };

  return { post };
};

export default usePostRecoverPassword;
