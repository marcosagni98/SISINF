import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { IncidencesMonthlyResume } from "../../interfaces/statistics/IncidencesMonthlyResume";

  
const useFetchMonthlyIncidences = () => {
  /** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom 'useFetchWithAuthBase' hook.
   * 'fetchData' is the function used to send authenticated GET requests and fetch data from the API.
   * The response type is 'IncidencesMonthlyResume', which defines the structure of the data returned for the monthly summary of incidents.
   */
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<IncidencesMonthlyResume>();

    /** 
   * 'fetch' function: Calls 'fetchData' to send a GET request to the API to fetch a monthly summary of incidents.
   * It constructs the API endpoint URL for the monthly incidents summary.
   * 
   * @returns {Promise} - A promise that resolves with the response when the request is completed.
   */
  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/incidences-monthly-resume`);
  };

  return { data, completed, error, fetch };
};

export default useFetchMonthlyIncidences;
