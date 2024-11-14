import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { UserHappiness } from "../../interfaces/statistics/UserHappiness";

const useFetchUserHappiness = () => {
  const { data, completed, error, fetchData } = useFetchWithAuthBase<UserHappiness>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/User-happiness`);
  };

  return { data, completed, error, fetch };
};

export default useFetchUserHappiness;
