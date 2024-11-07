import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { IncidencesMonthlyResume } from "../../interfaces/statistics/IncidencesMonthlyResume";

/** 
 * Custom hook to fetch the monthly resume of incidences with authentication
 * This hook simplifies the process of retrieving a summary of incidences data on a monthly basis.
 * @returns {Object} - Contains the data, completed status, error, and the fetch function for retrieving the data
 */
const useFetchMonthlyIncidences = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<IncidencesMonthlyResume>();

  /** 
   * Function to fetch the monthly resume of incidences
   * @returns {Promise<any>} - Returns a promise with the response from the API containing the incidences monthly summary
   */
  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/incidences-monthly-resume`);
  };

  return { data, completed, error, fetch };
};

export default useFetchMonthlyIncidences;
