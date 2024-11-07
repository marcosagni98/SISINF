import { API_BASE_URL } from "../../config";
import { IncidenceMessage } from "../../interfaces/incidences/IncidenceMessage";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

/** 
 * Custom hook to fetch messages related to a specific incidence with authentication
 * This hook provides an easy way to fetch message data for a given incidence.
 * @returns {Object} - Contains the fetched data (messages), loading status, error, and a fetch function
 */
const useFetchMessages = () => {
  const { data, completed, error, fetchData } = useFetchWithAuthBase<IncidenceMessage[]>();

  /** 
   * Function to fetch messages for a specific incidence
   * @param {number} id - The ID of the incidence to fetch messages for
   * @returns {Promise<any>} - Returns a promise with the message data for the given incidence ID
   */
  const fetch = (id: number) => {
    return fetchData(`${API_BASE_URL}/api/v1/Message/${id}`);
  };

  return { data, completed, error, fetch };
};

export default useFetchMessages;
