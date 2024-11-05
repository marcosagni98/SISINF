import { API_BASE_URL } from "../../config";
import { CreateFeedback } from "../../interfaces/incidences/CreateFeedback";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePostWithAuthBase from "../usePostWithAuthBase";

const usePostFeedback = () => {
  const { postData } = usePostWithAuthBase<GenericRespone, CreateFeedback>();

  const post = (data: CreateFeedback) => {
    return postData(`${API_BASE_URL}/api/v1/UserFeedback`, data);
  };

  return { post };
};

export default usePostFeedback;
