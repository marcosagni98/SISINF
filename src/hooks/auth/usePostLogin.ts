  import { API_BASE_URL } from "../../config";
  import { Login } from "../../interfaces/auth/Login";
  import { LoginResponse } from "../../interfaces/auth/LoginResponse";
  import usePostBase from "../usePostBase";

  const usePostLogin = () => {
    const { postData } =
      usePostBase<LoginResponse, Login>();
    /**
     * Sends a POST request with login data.
     * 
     * @param {Login} data - The login data that will be sent in the POST request.
     * @returns {Promise<LoginResponse>} - A promise that resolves with the login response data.
     */
    const post = (data: Login) => {
      return postData(`${API_BASE_URL}/api/v1/Auth/login`, data);
    };

    return { post };  
  };

  export default usePostLogin;
