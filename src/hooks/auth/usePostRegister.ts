import { API_BASE_URL } from "../../config";
import { Login } from "../../interfaces/auth/Login";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePostBase from "../usePostBase";

const usePostRegister = () => {
  const { postData } =
    usePostBase<GenericRespone, Login>();

  const post = (data: Login) => {
    return postData(`${API_BASE_URL}/api/v1/Auth/register`, data);
  };

  return { post };  
};

export default usePostRegister;
