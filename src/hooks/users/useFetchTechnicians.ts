import { API_BASE_URL } from "../../config";
import { UsersTableRow } from "../../interfaces/users/UsersTableRow";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

/** 
 * Custom hook to fetch the list of technicians with authentication
 * This hook simplifies the process of retrieving the data for all technicians.
 * @returns {Object} - Contains the data, completed status, error, and the fetch function for retrieving the technician list
 */
const useFetchTechnicians = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<UsersTableRow[]>();

  /** 
   * Function to fetch the list of technicians
   * @returns {Promise<any>} - Returns a promise with the response from the API containing the list of technicians
   */
  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/User/technicians`);
  };

  return { data, completed, error, fetch };
};

export default useFetchTechnicians;
