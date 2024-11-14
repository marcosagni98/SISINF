import { API_BASE_URL } from "../../config";
import { UsersTableRow } from "../../interfaces/users/UsersTableRow";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

const useFetchTechnicians = () => {
  /** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom 'useFetchWithAuthBase' hook.
   * The 'fetchData' function is used to send authenticated GET requests to the API.
   * The response type is 'UsersTableRow[]', which represents an array of users (technicians in this case).
   */
  const { data, completed, error, fetchData } =
  useFetchWithAuthBase<UsersTableRow[]>();

   /** 
   * 'fetch' function: Calls 'fetchData' to send a GET request to the API to fetch the list of technicians.
   * It constructs the API endpoint URL for fetching technicians.
   * 
   * @returns {Promise} - A promise that resolves with the response from the API when the request is completed.
   */
  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/User/technicians`);
  };

  return { data, completed, error, fetch };
};

export default useFetchTechnicians;
