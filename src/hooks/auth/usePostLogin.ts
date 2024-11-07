  import { API_BASE_URL } from "../../config";
  import { Login } from "../../interfaces/auth/Login";
  import { LoginResponse } from "../../interfaces/auth/LoginResponse";
  import usePostBase from "../usePostBase";

  /** 
   * Custom hook to handle login POST request
   * This hook wraps the usePostBase hook and provides an easy way to make a POST request to the login endpoint.
   * @returns {Object} - Contains a post function to perform the login request
   */
  const usePostLogin = () => {
    const { postData } =
      usePostBase<LoginResponse, Login>();
    /** 
     * Function to perform the login POST request
     * @param {Login} data - The login credentials data
     * @returns {Promise<LoginResponse>} - Returns a promise with the login response
     */
    const post = (data: Login) => {
      return postData(`${API_BASE_URL}/api/v1/Auth/login`, data);
    };

    return { post };  
  };

  export default usePostLogin;
