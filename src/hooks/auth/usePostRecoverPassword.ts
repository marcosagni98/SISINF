import { API_BASE_URL } from "../../config";
import { RecoverPassword } from "../../interfaces/auth/RecoverPassword";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePostBase from "../usePostBase";

  /** 
   * 'postData' is destructured from the 'usePostBase' hook.
   * It will be used to send POST requests with the password recovery data.
   */
const usePostRecoverPassword = () => {
  const { postData } =
    usePostBase<GenericRespone, RecoverPassword>();

  /** 
   * 'post' function: Sends a POST request to the 'forgot-password' API endpoint with the provided password recovery data.
   * It uses the 'postData' function to make the request.
   */
  const post = (data: RecoverPassword) => {
    return postData(`${API_BASE_URL}/api/v1/Auth/forgot-password`, data);
  };

  return { post };  
};

export default usePostRecoverPassword;
