import { API_BASE_URL } from "../../config";
import { IncidenceDetails } from "../../interfaces/incidences/IncidenceDetails";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

/** 
 * Custom hook to fetch the details of a specific incidence with authentication
 * This hook provides an easy way to fetch detailed information for a given incidence.
 * @returns {Object} - Contains the fetched data, loading status, error, and a fetch function
 */
const useFetchIncidence = () => {
  const { data, completed, error, fetchData } = useFetchWithAuthBase<IncidenceDetails>();

  /** 
   * Function to fetch details for a specific incidence
   * @param {number} id - The ID of the incidence to fetch details for
   * @returns {Promise<any>} - Returns a promise with the incidence details data
   */
  const fetch = (id: number) => {
    return fetchData(`${API_BASE_URL}/api/v1/Incident/${id}`);
  };

  return { data, completed, error, fetch };
};

export default useFetchIncidence;
