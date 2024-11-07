import { API_BASE_URL } from "../../config";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePutWithAuthBase from "../usePutWithAuthBase";
import { UpdateIncidenceInfo } from "../../interfaces/incidences/UpdateIncidenceInfo";

const usePutIncidentInfo = () => {
  const { putData } =
    usePutWithAuthBase<GenericRespone, UpdateIncidenceInfo>();

  const put = (id: number, data: UpdateIncidenceInfo) => {
    return putData(`${API_BASE_URL}/api/v1/Incident/update-title-description/${id}`, data);
  };

  return { put };  
};

export default usePutIncidentInfo;
