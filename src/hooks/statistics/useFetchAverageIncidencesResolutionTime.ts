import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { AverageIncidencesResolutionTime } from "../../interfaces/statistics/AverageIncidencesResolutionTime";

const useFetchAverageIncidencesResolutionTime = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<AverageIncidencesResolutionTime>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/Average-incident-resolution-time`);
  };

  return { data, completed, error, fetch };
};

export default useFetchAverageIncidencesResolutionTime;
