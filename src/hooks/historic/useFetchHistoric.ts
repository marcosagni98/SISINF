import useFetchWithAuthAndPaginationBase from "../useFetchWithAuthAndPaginationBase";
import { API_BASE_URL } from "../../config";
import { HistoricTableRow } from "../../interfaces/historic/HistoricTableRow";
import { PaginationProps } from "../../interfaces/shared/PaginationProps";


const useFetchHistoric = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthAndPaginationBase<HistoricTableRow>();

  const fetch = (paginationProps: PaginationProps) => {
    return fetchData(`${API_BASE_URL}/api/v1/Incident/Historic`, paginationProps);
  };

  return { data, completed, error, fetch };
};

export default useFetchHistoric;
