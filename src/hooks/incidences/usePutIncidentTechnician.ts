import { API_BASE_URL } from "../../config";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePutWithAuthBase from "../usePutWithAuthBase";
import { UpdateIncidenceStatus } from "../../interfaces/incidences/UpdateIncidenceStatus";

const usePutIncidentTechnician = () => {
  const { putData } =
    usePutWithAuthBase<GenericRespone, UpdateIncidenceStatus>();

  const put = (id: number, data: UpdateIncidenceStatus) => {
    return putData(`${API_BASE_URL}/api/v1/Incident/set-tecnitian/${id}`, data);
  };

  return { put };  
};

export default usePutIncidentTechnician;
