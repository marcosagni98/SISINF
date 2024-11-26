import { API_BASE_URL } from "../../config";
import { IncidencesTableRow } from "../../interfaces/incidences/IncidencesTableRow";
import { PaginationProps } from "../../interfaces/shared/PaginationProps";
import useFetchWithAuthAndPaginationBase from "../useFetchWithAuthAndPaginationBase";

/** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom 'useFetchWithAuthAndPaginationBase' hook.
   * 'data' holds the fetched incidences, 'completed' indicates whether the fetch operation has finished,
   * 'error' stores any error message, and 'fetchData' is the function used to trigger the API request.
   */
const useFetchMyIncidences = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthAndPaginationBase<IncidencesTableRow>();

  /** 
   * 'fetch' function: Accepts pagination properties and calls 'fetchData' to fetch the incidences with pagination.
   * It constructs the API endpoint URL dynamically using the pagination properties to manage data retrieval.
   * 
   * @param {PaginationProps} paginationProps - The pagination properties to control the API response.
   * @returns {Promise} - A promise that resolves with the incidences data when the request is completed.
   */
  const fetch = (paginationProps: PaginationProps) => {
    return fetchData(`${API_BASE_URL}/api/v1/Incident`, paginationProps);
  };

  return { data, completed, error, fetch };
};

export default useFetchMyIncidences;
