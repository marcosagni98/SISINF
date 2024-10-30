import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { ActiveIncidences } from "../../interfaces/statistics/ActiveIncidences";

const useFetchActiveIncidences = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<ActiveIncidences>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/active-incidences/1`);
  };

  return { data, completed, error, fetch };
};

export default useFetchActiveIncidences;
