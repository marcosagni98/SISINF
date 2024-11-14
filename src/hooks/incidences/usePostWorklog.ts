import { API_BASE_URL } from "../../config";
import { CreateWorklog } from "../../interfaces/incidences/CreateWorklog";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePostWithAuthBase from "../usePostWithAuthBase";

const usePostWorklog = () => {
  const { postData } = usePostWithAuthBase<GenericRespone, CreateWorklog>();

  const post = (data: CreateWorklog) => {
    return postData(`${API_BASE_URL}/api/v1/WorkLog`, data);
  };

  return { post };
};

export default usePostWorklog;
