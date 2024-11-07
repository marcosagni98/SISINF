import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { ActiveIncidences } from "../../interfaces/statistics/ActiveIncidences";
/** 
 * Custom hook to fetch the active incidences
 *
 * @returns {Object} - Contains the data, completed status, error, and the fetch function for retrieving the data
 */
const useFetchActiveIncidences = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<ActiveIncidences>();

  /** 
   * Function to fetch the active incidences by day
   * @returns {Promise<any>} - Returns a promise with the response from the API
   */
  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/Active-incidents`);
  };

  return { data, completed, error, fetch };
};

export default useFetchActiveIncidences;
