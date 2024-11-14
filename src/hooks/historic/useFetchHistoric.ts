import useFetchWithAuthAndPaginationBase from "../useFetchWithAuthAndPaginationBase";
import { API_BASE_URL } from "../../config";
import { HistoricTableRow } from "../../interfaces/historic/HistoricTableRow";
import { PaginationProps } from "../../interfaces/shared/PaginationProps";


const useFetchHistoric = () => {
  /** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom 'useFetchWithAuthAndPaginationBase' hook.
   * 'data' holds the fetched historical data, 'completed' indicates if the fetch is finished,
   * 'error' holds any error message, and 'fetchData' is the function used to trigger the API call.
   */
  const { data, completed, error, fetchData } =
  useFetchWithAuthAndPaginationBase<HistoricTableRow>();

  /** 
   * 'fetch' function: Accepts pagination properties and calls 'fetchData' with the constructed URL and pagination settings.
   * It triggers the fetch operation for historical incident data with the given pagination.
   * 
   * @param {PaginationProps} paginationProps - The pagination properties to control the API response.
   * @returns {Promise} - A promise that resolves when the data fetch is complete.
   */
  const fetch = (paginationProps: PaginationProps) => {
    return fetchData(`${API_BASE_URL}/api/v1/Incident/Historic`, paginationProps);
  };

  return { data, completed, error, fetch };
};

export default useFetchHistoric;
