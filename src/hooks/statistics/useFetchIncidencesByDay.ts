import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { IncidentCountByDateArray } from "../../interfaces/statistics/IncidencesByDay";

/** 
 * Custom hook to fetch the count of incidences by date with authentication
 * This hook simplifies the process of retrieving the count of incidences grouped by day.
 * @returns {Object} - Contains the data, completed status, error, and the fetch function for retrieving the data
 */
const useFetchIncidencesByDay = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<IncidentCountByDateArray>();

  /** 
   * Function to fetch the count of incidences by day
   * @returns {Promise<any>} - Returns a promise with the response from the API containing the incidences data by day
   */
  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/incidences-by-day`);
  };

  return { data, completed, error, fetch };
};

export default useFetchIncidencesByDay;
