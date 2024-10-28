import useFetchBase from "../useFetchBase";
import { API_BASE_URL } from "../../config";
import { IncidencesTableRow } from "../../interfaces/incidences/IncidencesTableRow";

const useFetchRecentIncidences = () => {
  const { data, completed, error, fetchData } =
    useFetchBase<IncidencesTableRow[]>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/recent-incidences`);
  };

  return { data, completed, error, fetch };
};

export default useFetchRecentIncidences;
