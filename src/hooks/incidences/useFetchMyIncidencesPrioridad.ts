import { API_BASE_URL } from "../../config";
import { IncidencePriority } from "../../enums/incidencePriority";
import { IncidencesTableRow } from "../../interfaces/incidences/IncidencesTableRow";
import { PaginationProps } from "../../interfaces/shared/PaginationProps";
import useFetchWithAuthAndPaginationBase from "../useFetchWithAuthAndPaginationBase";

/** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom 'useFetchWithAuthAndPaginationBase' hook.
   * 'data' holds the fetched incidences, 'completed' indicates whether the fetch operation has finished,
   * 'error' contains any error message, and 'fetchData' is the function used to trigger the API request.
   */
const useFetchMyIncidencesPrioridad = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthAndPaginationBase<IncidencesTableRow>();

  /** 
   * 'fetch' function: Accepts pagination properties and an incidence priority value, and uses 'fetchData' to fetch the incidences with pagination filtered by priority.
   * It constructs the API endpoint URL dynamically, passing the priority level and pagination properties.
   * 
   * @param {PaginationProps} paginationProps - The pagination properties that control the API response.
   * @param {IncidencePriority} prioridad - The priority of the incidences to filter by.
   * @returns {Promise} - A promise that resolves with the filtered incidences data when the request is completed.
   */
  const fetch = (paginationProps: PaginationProps, prioridad: IncidencePriority) => {
    return fetchData(`${API_BASE_URL}/api/v1/Incident/by-priority/${prioridad}`, paginationProps);
  };

  return { data, completed, error, fetch };
};

export default useFetchMyIncidencesPrioridad;
