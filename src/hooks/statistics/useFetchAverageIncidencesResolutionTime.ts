import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { AverageIncidencesResolutionTime } from "../../interfaces/statistics/AverageIncidencesResolutionTime";

/** 
 * Custom hook to fetch the average incidences resolution time
 *
 * @returns {Object} - Contains the data, completed status, error, and the fetch function for retrieving the data
 */
const useFetchAverageIncidencesResolutionTime = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<AverageIncidencesResolutionTime>();

  /**
   * Function to fetch the average incidences resolution time
   * @returns {Promise<any>} - Returns a promise with the response from the API
  */
  const fetch = () => {
    return fetchData(`${API_BASE_URL}/average-incidences-resolution-time/1`);
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/Average-incident-resolution-time`);
  };

  return { data, completed, error, fetch };
};

export default useFetchAverageIncidencesResolutionTime;