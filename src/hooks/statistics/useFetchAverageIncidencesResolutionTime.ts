import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { AverageIncidencesResolutionTime } from "../../interfaces/statistics/AverageIncidencesResolutionTime";

const useFetchAverageIncidencesResolutionTime = () => {
  /** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom 'useFetchWithAuthBase' hook.
   * 'fetchData' is the function used to send authenticated GET requests and fetch data from the API.
   * The response type is 'AverageIncidencesResolutionTime', which defines the structure of the data returned for the average resolution time of incidents.
   */
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<AverageIncidencesResolutionTime>();

  /** 
   * 'fetch' function: Calls 'fetchData' to send a GET request to the API to fetch the average resolution time for incidents.
   * It constructs the API endpoint URL for the average incident resolution time statistics.
   * 
   * @returns {Promise} - A promise that resolves with the response when the request is completed.
   */
  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/Average-incident-resolution-time`);
  };

  return { data, completed, error, fetch };
};

export default useFetchAverageIncidencesResolutionTime;
