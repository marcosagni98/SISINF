import { API_BASE_URL } from "../../config";
import { IncidencesTableRow } from "../../interfaces/incidences/IncidencesTableRow";
import useFetchWithAuthAndPaginationBase from "../useFetchWithAuthAndPaginationBase";
import { PaginationProps } from "../../interfaces/shared/PaginationProps";

/** 
 * Custom hook to fetch the list of recent incidences with authentication and pagination
 * This hook provides an easy way to fetch the most recent incidences for a user, with pagination controls.
 * @returns {Object} - Contains the fetched data (incidences), loading status, error, and a fetch function
 */
const useFetchRecentIncidences = () => {
  const { data, completed, error, fetchData } = useFetchWithAuthAndPaginationBase<IncidencesTableRow>();

  /** 
   * Function to fetch recent incidences with pagination
   * @param {PaginationProps} paginationProps - The pagination properties to control the fetching of the data
   * @returns {Promise<any>} - Returns a promise with the recent incidences data based on pagination
   */
  const fetch = (paginationProps: PaginationProps) => {
    return fetchData(`${API_BASE_URL}/api/v1/Incident`, paginationProps);
  };

  return { data, completed, error, fetch };
};

export default useFetchRecentIncidences;
