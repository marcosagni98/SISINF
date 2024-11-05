import { API_BASE_URL } from "../../config";
import { CreateIncidence } from "../../interfaces/incidences/CreateIncidence";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePostWithAuthBase from "../usePostWithAuthBase";

const usePostIncidence = () => {
  const { postData } = usePostWithAuthBase<GenericRespone, CreateIncidence>();

  const post = (data: CreateIncidence) => {
    return postData(`${API_BASE_URL}/api/v1/Incident`, data);
  };

  return { post };
};

export default usePostIncidence;
