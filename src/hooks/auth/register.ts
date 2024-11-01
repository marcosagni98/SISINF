import { API_BASE_URL } from "../../config";
import { Login } from "../../interfaces/auth/Login";
import { LoginResponse } from "../../interfaces/auth/LoginResponse";
import usePostBase from "../usePostBase";

const usePostRegister = () => {
  const { data, completed, error, postData } =
    usePostBase<LoginResponse, Login>();

  const post = (data: Login) => {
    return postData(`${API_BASE_URL}/api/v1/Auth/register`, data);
  };

  return { data, completed, error, post };  
};

export default usePostRegister;
