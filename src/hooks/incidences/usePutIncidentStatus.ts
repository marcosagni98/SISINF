import { API_BASE_URL } from "../../config";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import { UpdateIncidenceStatus } from "../../interfaces/incidences/UpdateIncidenceStatus";
import usePutWithAuthBase from "../usePutWithAuthBase";

const usePutIncidentStatus = () => {
  const { putData } =
    usePutWithAuthBase<GenericRespone, UpdateIncidenceStatus>();

  const put = (id: number, data: UpdateIncidenceStatus) => {
    return putData(`${API_BASE_URL}/api/v1/Incident/update-status/${id}`, data);
  };

  return { put };  
};

export default usePutIncidentStatus;
