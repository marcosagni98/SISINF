import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { IncidencesTableRow } from "../../interfaces/incidences/IncidencesTableRow";
import useFetchWithAuthAndPaginationBase from "../useFetchWithAuthAndPaginationBase";
import { PaginationProps } from "../../interfaces/shared/PaginationProps";

const useFetchRecentIncidences = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthAndPaginationBase<IncidencesTableRow>();

  const fetch = (paginationProps: PaginationProps) => {
    return fetchData(`${API_BASE_URL}/api/v1/Incident`, paginationProps);
  };

  return { data, completed, error, fetch };
};

export default useFetchRecentIncidences;
