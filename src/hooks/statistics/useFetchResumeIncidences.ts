import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { IncidencesResume } from "../../interfaces/statistics/IncidencesResume";

const useFetchResumeIncidences = () => {
  const { data, completed, error, fetchData } = useFetchWithAuthBase<IncidencesResume>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/incidences-resume`);
  };

  return { data, completed, error, fetch };
};

export default useFetchResumeIncidences;
