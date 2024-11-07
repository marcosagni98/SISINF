import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { IncidencesResolution } from "../../interfaces/statistics/IncidencesResolution";

/** 
 * Custom hook to fetch the resolution data of incidences with authentication
 * This hook simplifies the process of retrieving the resolution statistics for incidences.
 * @returns {Object} - Contains the data, completed status, error, and the fetch function for retrieving the data
 */
const useFetchIncidencesResolution = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<IncidencesResolution>();

  /** 
   * Function to fetch the incidences resolution data
   * @returns {Promise<any>} - Returns a promise with the response from the API containing the incidences resolution statistics
   */
  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/incidences-by-day`);
  };

  return { data, completed, error, fetch };
};

export default useFetchIncidencesResolution;
