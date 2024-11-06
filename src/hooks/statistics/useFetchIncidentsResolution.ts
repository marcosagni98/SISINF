import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { IncidencesResolution } from "../../interfaces/statistics/IncidencesResolution";

const useFetchIncidencesResolution = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<IncidencesResolution>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/incidences-by-day`);
  };

  return { data, completed, error, fetch };
};

export default useFetchIncidencesResolution;
