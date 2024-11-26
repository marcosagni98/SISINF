import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { UserHappiness } from "../../interfaces/statistics/UserHappiness";

const useFetchUserHappiness = () => {
  /** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom 'useFetchWithAuthBase' hook.
   * 'fetchData' is the function used to send authenticated GET requests and fetch data from the API.
   * The response type is 'UserHappiness', which defines the structure of the data related to user happiness statistics.
   */
  const { data, completed, error, fetchData } = useFetchWithAuthBase<UserHappiness>();

  /** 
   * 'fetch' function: Calls 'fetchData' to send a GET request to the API to fetch the user happiness statistics.
   * It constructs the API endpoint URL for user happiness statistics.
   * 
   * @returns {Promise} - A promise that resolves with the response when the request is completed.
   */
  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/User-happiness`);
  };

  return { data, completed, error, fetch };
};

export default useFetchUserHappiness;
