import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { IncidencesResume } from "../../interfaces/statistics/IncidencesResume";

const useFetchResumeIncidences = () => {
  /** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom 'useFetchWithAuthBase' hook.
   * 'fetchData' is the function used to send authenticated GET requests and fetch data from the API.
   * The response type is 'IncidencesResume', which defines the structure of the data returned for the summary of all incidents.
   */
  const { data, completed, error, fetchData } = useFetchWithAuthBase<IncidencesResume>();

  /** 
   * 'fetch' function: Calls 'fetchData' to send a GET request to the API to fetch a summary of incidents.
   * It constructs the API endpoint URL for the incidents summary.
   * 
   * @returns {Promise} - A promise that resolves with the response when the request is completed.
   */
  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/incidences-resume`);
  };

  return { data, completed, error, fetch };
};

export default useFetchResumeIncidences;
