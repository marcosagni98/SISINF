import { API_BASE_URL } from "../../config";
import { CreateIncidence } from "../../interfaces/incidences/CreateIncidence";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePostBase from "../usePostBase";

const usePostIncidence = () => {
  const { data, completed, error, postData } =
    usePostBase<GenericRespone, CreateIncidence>();

  const post = (data: CreateIncidence) => {
    return postData(`${API_BASE_URL}/api/v1/Incident`, data);
  };

  return { data, completed, error, post };  
};

export default usePostIncidence;
