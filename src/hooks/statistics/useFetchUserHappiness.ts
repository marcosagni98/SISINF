import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { UserHappiness } from "../../interfaces/statistics/UserHappiness";

/** 
 * Custom hook to fetch user happiness statistics with authentication
 * This hook simplifies the process of retrieving user happiness data.
 * @returns {Object} - Contains the data, completed status, error, and the fetch function for retrieving the data
 */
const useFetchUserHappiness = () => {
  const { data, completed, error, fetchData } = useFetchWithAuthBase<UserHappiness>();

  /** 
   * Function to fetch the user happiness statistics
   * @returns {Promise<any>} - Returns a promise with the response from the API containing the user happiness data
   */
  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/User-happiness`);
  };

  return { data, completed, error, fetch };
};

export default useFetchUserHappiness;
