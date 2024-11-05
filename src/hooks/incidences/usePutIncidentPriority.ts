import { API_BASE_URL } from "../../config";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePutWithAuthBase from "../usePutWithAuthBase";
import { UpdateIncidencePriority } from "../../interfaces/incidences/UpdateIncidencePriority";

const usePutIncidentPriority = () => {
  const { putData } =
    usePutWithAuthBase<GenericRespone, UpdateIncidencePriority>();

  const put = (id: number, data: UpdateIncidencePriority) => {
    return putData(`${API_BASE_URL}/api/v1/Incident/update-priority/${id}`, data);
  };

  return { put };  
};

export default usePutIncidentPriority;
