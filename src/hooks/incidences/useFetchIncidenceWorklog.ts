import { API_BASE_URL } from "../../config";
import { IncidenceWorkLog } from "../../interfaces/incidences/IncidenceWorkLog";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

const useFetchIncidenceWorklog = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthBase<IncidenceWorkLog[]>();

  const fetch = (id: number) => {
    return fetchData(`${API_BASE_URL}/api/v1/WorkLog/Incident/${id}`);
  };

  return { data, completed, error, fetch };
};

export default useFetchIncidenceWorklog;
