import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { UserHappiness } from "../../interfaces/statistics/UserHappiness";

const useFetchResumeIncidences = () => {
  const { data, completed, error, fetchData } = useFetchWithAuthBase<UserHappiness>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/incidences-resume`);
  };

  return { data, completed, error, fetch };
};

export default useFetchResumeIncidences;
