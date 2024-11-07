import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { AverageIncidencesResolutionTime } from "../../interfaces/statistics/AverageIncidencesResolutionTime";

/** 
 * Function to fetch average incident resolution time from the API.
 * It calls the API endpoint to retrieve the average resolution time data for incidents.
 * 
 * @returns {Promise<any>} - Returns a promise with the average incident resolution time data.
 */
const fetch = () => {
  return fetchData(`${API_BASE_URL}/api/v1/Statistics/Average-incident-resolution-time`);
};

/** 
 * Custom hook to fetch the average incident resolution time data with authentication.
 * Provides a way to retrieve average resolution time statistics for incidents.
 * 
 * @returns {Object} - Contains fetched data, loading status, error, and the fetch function.
 */
const useFetchAverageIncidencesResolutionTime = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<AverageIncidencesResolutionTime>();

  return { data, completed, error, fetch };
};

export default useFetchAverageIncidencesResolutionTime;
