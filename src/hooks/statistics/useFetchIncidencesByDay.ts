import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { IncidentCountByDateArray } from "../../interfaces/statistics/IncidencesByDay";

const useFetchIncidencesByDay = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<IncidentCountByDateArray>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/incidences-by-day`);
  };

  

  return { data, completed, error, fetch };
};

export default useFetchIncidencesByDay;
