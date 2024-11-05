import { API_BASE_URL } from "../../config";
import { GenericRespone } from "../../interfaces/shared/GenericRespone";
import usePutWithAuthBase from "../usePutWithAuthBase";
import { UpdateIncidenceTechnician } from "../../interfaces/incidences/UpdateIncidenceTechnician";

const usePutIncidentTechnician = () => {
  const { putData } =
    usePutWithAuthBase<GenericRespone, UpdateIncidenceTechnician>();

  const put = (id: number, data: UpdateIncidenceTechnician) => {
    return putData(`${API_BASE_URL}/api/v1/Incident/set-technician/${id}`, data);
  };

  return { put };  
};

export default usePutIncidentTechnician;
