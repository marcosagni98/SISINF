import { API_BASE_URL } from "../../config";
import { IncidenceWorkLog } from "../../interfaces/incidences/IncidenceWorkLog";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

/** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom 'useFetchWithAuthBase' hook.
   * 'data' contains the fetched work log data, 'completed' indicates whether the fetch has finished,
   * 'error' stores any error message, and 'fetchData' is the function used to trigger the API request.
   */
const useFetchIncidenceWorklog = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthBase<IncidenceWorkLog[]>();

  /** 
   * 'fetch' function: Accepts an incident ID and uses 'fetchData' to fetch the work log for that specific incident.
   * It constructs the API endpoint URL dynamically based on the provided incident ID.
   * 
   * @param {number} id - The ID of the incident whose work log is being fetched.
   * @returns {Promise} - A promise that resolves with the work log data when the request is completed.
   */
  const fetch = (id: number) => {
    return fetchData(`${API_BASE_URL}/api/v1/WorkLog/Incident/${id}`);
  };

  return { data, completed, error, fetch };
};

export default useFetchIncidenceWorklog;
