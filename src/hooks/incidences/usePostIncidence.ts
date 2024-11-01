import { API_BASE_URL } from "../../config";
import { Login } from "../../interfaces/auth/Login";
import { LoginResponse } from "../../interfaces/auth/LoginResponse";
import { CreateIncidence } from "../../interfaces/incidences/CreateIncidence";
import { CreateIncidenceResponse } from "../../interfaces/incidences/CreateIncidenceRespone";
import usePostBase from "../usePostBase";

const usePostIncidence = () => {
  const { data, completed, error, postData } =
    usePostBase<CreateIncidenceResponse, CreateIncidence>();

  const post = (data: CreateIncidence) => {
    return postData(`${API_BASE_URL}/api/v1/Incident`, data);
  };

  return { data, completed, error, post };  
};

export default usePostIncidence;
