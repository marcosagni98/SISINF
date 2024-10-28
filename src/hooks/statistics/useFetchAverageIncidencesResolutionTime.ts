import useFetchBase from "../useFetchBase";
import { API_BASE_URL } from "../../config";
import { AverageIncidencesResolutionTime } from "../../interfaces/statistics/AverageIncidencesResolutionTime";

const useFetchAverageIncidencesResolutionTime = () => {
  const { data, completed, error, fetchData } =
    useFetchBase<AverageIncidencesResolutionTime>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/average-incidences-resolution-time/1`);
  };

  return { data, completed, error, fetch };
};

export default useFetchAverageIncidencesResolutionTime;
