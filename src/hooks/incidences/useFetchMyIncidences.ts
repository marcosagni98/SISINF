import { API_BASE_URL } from "../../config";
import { IncidencesTableRow } from "../../interfaces/incidences/IncidencesTableRow";
import useFetchWithAuthAndPaginationBase from "../useFetchWithAuthAndPaginationBase";

const useFetchMyIncidences = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthAndPaginationBase<IncidencesTableRow>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Incident`);
  };

  return { data, completed, error, fetch };
};

export default useFetchMyIncidences;
