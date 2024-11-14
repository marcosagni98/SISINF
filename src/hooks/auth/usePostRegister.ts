import { API_BASE_URL } from "../../config";
import { Login } from "../../interfaces/auth/Login";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePostBase from "../usePostBase";

/** 
   * 'postData' is destructured from the 'usePostBase' hook.
   * It will be used to send POST requests with the registration data.
   */
const usePostRegister = () => {
  const { postData } =
    usePostBase<GenericRespone, Login>();

    /** 
   * 'post' function: Sends a POST request to the 'register' API endpoint with the provided registration data.
   * It uses the 'postData' function to make the request.
   */
  const post = (data: Login) => {
    return postData(`${API_BASE_URL}/api/v1/Auth/register`, data);
  };

  return { post };  
};

export default usePostRegister;
