import { API_BASE_URL } from "../../config";
import { IncidencesTableRow } from "../../interfaces/incidences/IncidencesTableRow";
import { PaginationProps } from "../../interfaces/shared/PaginationProps";
import useFetchWithAuthAndPaginationBase from "../useFetchWithAuthAndPaginationBase";

const useFetchMyIncidences = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthAndPaginationBase<IncidencesTableRow>();

  const fetch = (paginationProps: PaginationProps) => {
    return fetchData(`${API_BASE_URL}/api/v1/Incident`, paginationProps);
  };

  return { data, completed, error, fetch };
};

export default useFetchMyIncidences;
