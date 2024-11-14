import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { ActiveIncidences } from "../../interfaces/statistics/ActiveIncidences";

const useFetchActiveIncidences = () => {
   /** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom 'useFetchWithAuthBase' hook.
   * 'fetchData' is the function used to send authenticated GET requests and fetch data from the API.
   * The response type is 'ActiveIncidences' which defines the structure of the data returned for active incidences.
   */
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<ActiveIncidences>();

  /** 
   * 'fetch' function: Calls 'fetchData' to send a GET request to the API to fetch the active incidences.
   * It constructs the API endpoint URL for the active incidents statistics.
   * 
   * @returns {Promise} - A promise that resolves with the response when the request is completed.
   */
  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/Active-incidents`);
  };

  return { data, completed, error, fetch };
};

export default useFetchActiveIncidences;
