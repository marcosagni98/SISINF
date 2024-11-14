import { API_BASE_URL } from "../../config";
import { IncidencePriority } from "../../enums/incidencePriority";
import { IncidencesTableRow } from "../../interfaces/incidences/IncidencesTableRow";
import { PaginationProps } from "../../interfaces/shared/PaginationProps";
import useFetchWithAuthAndPaginationBase from "../useFetchWithAuthAndPaginationBase";

/** 
 * Custom hook to fetch the list of user's incidences filtered by priority with authentication and pagination
 * This hook provides an easy way to fetch incidences for a user, filtered by priority, with pagination controls.
 * @returns {Object} - Contains the fetched data (incidences), loading status, error, and a fetch function
 */
const useFetchMyIncidencesPrioridad = () => {
  const { data, completed, error, fetchData } = useFetchWithAuthAndPaginationBase<IncidencesTableRow>();

  /** 
   * Function to fetch incidences filtered by priority with pagination
   * @param {PaginationProps} paginationProps - The pagination properties to control the fetching of the data
   * @param {IncidencePriority} prioridad - The priority filter to apply to the incidences
   * @returns {Promise<any>} - Returns a promise with the incidences data based on the priority and pagination
   */
  const fetch = (paginationProps: PaginationProps, prioridad: IncidencePriority) => {
    return fetchData(`${API_BASE_URL}/api/v1/Incident/by-priority/${prioridad}`, paginationProps);
  };

  return { data, completed, error, fetch };
};

export default useFetchMyIncidencesPrioridad;
