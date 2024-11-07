import useFetchWithAuthAndPaginationBase from "../useFetchWithAuthAndPaginationBase";
import { API_BASE_URL } from "../../config";
import { HistoricTableRow } from "../../interfaces/historic/HistoricTableRow";
import { PaginationProps } from "../../interfaces/shared/PaginationProps";

/** 
 * Custom hook to fetch historic incident data with authentication and pagination
 * This hook provides an easy way to fetch historical incident data using pagination.
 * @returns {Object} - Contains the fetched data, loading status, error, and a fetch function
 */
const useFetchHistoric = () => {
  const { data, completed, error, fetchData } = useFetchWithAuthAndPaginationBase<HistoricTableRow>();

  /** 
   * Function to fetch historical incident data with pagination
   * @param {PaginationProps} paginationProps - The pagination properties to control the data fetching
   * @returns {Promise<any>} - Returns a promise with the fetched data from the historic endpoint
   */
  const fetch = (paginationProps: PaginationProps) => {
    return fetchData(`${API_BASE_URL}/api/v1/Incident/Historic`, paginationProps);
  };

  return { data, completed, error, fetch };
};

export default useFetchHistoric;
