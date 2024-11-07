import { API_BASE_URL } from "../../config";
import { IncidenceHistory } from "../../interfaces/incidences/IncidenceHistory";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

/** 
 * Custom hook to fetch the history of a specific incidence with authentication
 * This hook provides an easy way to fetch the historical data for a given incidence.
 * @returns {Object} - Contains the fetched data (incidence history), loading status, error, and a fetch function
 */
const useFetchIncidenceHistory = () => {
  const { data, completed, error, fetchData } = useFetchWithAuthBase<IncidenceHistory[]>();

  /** 
   * Function to fetch the history of a specific incidence
   * @param {number} id - The ID of the incidence to fetch the history for
   * @returns {Promise<any>} - Returns a promise with the incidence history data
   */
  const fetch = (id: number) => {
    return fetchData(`${API_BASE_URL}/api/v1/IncidentHistory/${id}`);
  };

  return { data, completed, error, fetch };
};

export default useFetchIncidenceHistory;
