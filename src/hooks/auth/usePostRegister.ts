import { API_BASE_URL } from "../../config";
import { Login } from "../../interfaces/auth/Login";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePostBase from "../usePostBase";

/** 
 * Custom hook to handle the register POST request
 * This hook provides an easy way to make a POST request to the register endpoint.
 * @returns {Object} - Contains a post function to perform the registration request
 */
const usePostRegister = () => {
  const { postData } = usePostBase<GenericRespone, Login>();

  /** 
   * Function to perform the registration POST request
   * @param {Login} data - The registration data (user credentials)
   * @returns {Promise<GenericRespone>} - Returns a promise with the response for the registration request
   */
  const post = (data: Login) => {
    return postData(`${API_BASE_URL}/api/v1/Auth/register`, data);
  };

  return { post };
};

export default usePostRegister;
