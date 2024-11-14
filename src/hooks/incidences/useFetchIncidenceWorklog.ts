import { API_BASE_URL } from "../../config";
import { IncidenceWorkLog } from "../../interfaces/incidences/IncidenceWorkLog";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

/** 
 * Custom hook to fetch the work log of a specific incidence with authentication
 * This hook provides an easy way to fetch the work log data for a given incidence.
 * @returns {Object} - Contains the fetched data (work log), loading status, error, and a fetch function
 */
const useFetchIncidenceWorklog = () => {
  const { data, completed, error, fetchData } = useFetchWithAuthBase<IncidenceWorkLog[]>();

  /** 
   * Function to fetch the work log for a specific incidence
   * @param {number} id - The ID of the incidence to fetch the work log for
   * @returns {Promise<any>} - Returns a promise with the work log data for the given incidence ID
   */
  const fetch = (id: number) => {
    return fetchData(`${API_BASE_URL}/api/v1/WorkLog/Incident/${id}`);
  };

  return { data, completed, error, fetch };
};

export default useFetchIncidenceWorklog;
