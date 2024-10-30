import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { IncidencesTableRow } from "../../interfaces/incidences/IncidencesTableRow";

const useFetchMyIncidences = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<IncidencesTableRow[]>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/my-incidences`);
  };

  return { data, completed, error, fetch };
};

export default useFetchMyIncidences;
