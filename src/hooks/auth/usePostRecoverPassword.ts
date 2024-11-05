import { API_BASE_URL } from "../../config";
import { RecoverPassword } from "../../interfaces/auth/RecoverPassword";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePostBase from "../usePostBase";

const usePostRecoverPassword = () => {
  const { postData } =
    usePostBase<GenericRespone, RecoverPassword>();

  const post = (data: RecoverPassword) => {
    return postData(`${API_BASE_URL}/api/v1/Auth/forgot-password`, data);
  };

  return { post };  
};

export default usePostRecoverPassword;
