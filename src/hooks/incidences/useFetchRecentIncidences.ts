import { API_BASE_URL } from "../../config";
import { IncidencesTableRow } from "../../interfaces/incidences/IncidencesTableRow";
import useFetchWithAuthAndPaginationBase from "../useFetchWithAuthAndPaginationBase";
import { PaginationProps } from "../../interfaces/shared/PaginationProps";

/** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom 'useFetchWithAuthAndPaginationBase' hook.
   * 'data' holds the fetched incidences, 'completed' indicates whether the fetch operation has finished,
   * 'error' contains any error message, and 'fetchData' is the function used to trigger the API request.
   */
const useFetchRecentIncidences = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthAndPaginationBase<IncidencesTableRow>();

  /** 
   * 'fetch' function: Accepts pagination properties and uses 'fetchData' to fetch the recent incidences with pagination.
   * It constructs the API endpoint URL dynamically, passing the pagination properties to control data retrieval.
   * 
   * @param {PaginationProps} paginationProps - The pagination properties that control the API response.
   * @returns {Promise} - A promise that resolves with the recent incidences data when the request is completed.
   */
  const fetch = (paginationProps: PaginationProps) => {
    return fetchData(`${API_BASE_URL}/api/v1/Incident`, paginationProps);
  };

  return { data, completed, error, fetch };
};

export default useFetchRecentIncidences;
