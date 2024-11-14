import { API_BASE_URL } from "../../config";
import { IncidenceFeedback } from "../../interfaces/incidences/IncidenceFeedback";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

/** 
 * Custom hook to fetch feedback for a specific incidence with authentication
 * This hook provides an easy way to fetch user feedback data for a given incidence.
 * @returns {Object} - Contains the fetched data, loading status, error, and a fetch function
 */
const useFetchFeedback = () => {
  const { data, completed, error, fetchData } = useFetchWithAuthBase<IncidenceFeedback>();

  /** 
   * Function to fetch user feedback for a specific incidence
   * @param {number} id - The ID of the incidence for which feedback is being fetched
   * @returns {Promise<any>} - Returns a promise with the feedback data for the given incidence ID
   */
  const fetch = (id: number) => {
    return fetchData(`${API_BASE_URL}/api/v1/UserFeedback/by-incidence/${id}`);
  };

  return { data, completed, error, fetch };
};

export default useFetchFeedback;
