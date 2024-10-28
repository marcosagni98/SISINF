import useFetchBase from "../useFetchBase";
import { API_BASE_URL } from "../../config";
import { UserHappiness } from "../../interfaces/statistics/UserHappiness";

const useFetchUserHappiness = () => {
  const { data, completed, error, fetchData } = useFetchBase<UserHappiness>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/user-happiness/1`);
  };

  return { data, completed, error, fetch };
};

export default useFetchUserHappiness;
