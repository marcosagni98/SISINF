import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { ActiveIncidences } from "../../interfaces/statistics/ActiveIncidences";

const useFetchIncidencesByDay = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<ActiveIncidences>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/incidences-by-day`);
  };

  

  return { data, completed, error, fetch };
};

export default useFetchIncidencesByDay;
