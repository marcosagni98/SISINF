import { API_BASE_URL } from "../../config";
import { IncidenceHistory } from "../../interfaces/incidences/IncidenceHistory";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

const useFetchIncidenceHistory = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthBase<IncidenceHistory[]>();

  const fetch = (id: number) => {
    return fetchData(`${API_BASE_URL}/api/v1/IncidentHistory/${id}`);
  };

  return { data, completed, error, fetch };
};

export default useFetchIncidenceHistory;
