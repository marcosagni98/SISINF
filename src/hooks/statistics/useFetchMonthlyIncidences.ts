import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { IncidencesMonthlyResume } from "../../interfaces/statistics/IncidencesMonthlyResume";

const useFetchMonthlyIncidences = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<IncidencesMonthlyResume>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/incidences-monthly-resume`);
  };

  return { data, completed, error, fetch };
};

export default useFetchMonthlyIncidences;
