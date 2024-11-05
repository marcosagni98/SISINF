import { API_BASE_URL } from "../../config";
import { IncidenceFeedback } from "../../interfaces/incidences/IncidenceFeedback";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

const useFetchFeedback = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthBase<IncidenceFeedback>();

  const fetch = (id: number) => {
    return fetchData(`${API_BASE_URL}/api/v1/UserFeedback/by-incidence/${id}`);
  };

  return { data, completed, error, fetch };
};

export default useFetchFeedback;
