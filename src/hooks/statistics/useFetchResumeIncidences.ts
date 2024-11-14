import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { IncidencesResume } from "../../interfaces/statistics/IncidencesResume";

/** 
 * Custom hook to fetch a resume of incidences with authentication
 * This hook simplifies the process of retrieving a summary of all incidences data.
 * @returns {Object} - Contains the data, completed status, error, and the fetch function for retrieving the data
 */
const useFetchResumeIncidences = () => {
  const { data, completed, error, fetchData } = useFetchWithAuthBase<IncidencesResume>();

  /** 
   * Function to fetch the resume of incidences
   * @returns {Promise<any>} - Returns a promise with the response from the API containing the incidences summary
   */
  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/incidences-resume`);
  };

  return { data, completed, error, fetch };
};

export default useFetchResumeIncidences;
