import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { ActiveIncidences } from "../../interfaces/statistics/ActiveIncidences";

const useFetchActiveIncidences = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<ActiveIncidences>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/Active-incidents`);
  };

  return { data, completed, error, fetch };
};

export default useFetchActiveIncidences;
