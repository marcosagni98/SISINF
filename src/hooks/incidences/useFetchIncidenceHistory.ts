import { API_BASE_URL } from "../../config";
import { IncidenceHistory } from "../../interfaces/incidences/IncidenceHistory";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

/** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom 'useFetchWithAuthBase' hook.
   * 'data' holds the fetched incidence history, 'completed' indicates if the fetch is finished,
   * 'error' contains any error message, and 'fetchData' is the function that triggers the data fetch request.
   */
const useFetchIncidenceHistory = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthBase<IncidenceHistory[]>();

  /** 
   * 'fetch' function: Accepts an incident ID and uses 'fetchData' to fetch the history for that specific incident.
   * It constructs the API endpoint URL dynamically based on the provided incident ID.
   * 
   * @param {number} id - The ID of the incident whose history is being fetched.
   * @returns {Promise} - A promise that resolves with the incident history data when the request is completed.
   */
  const fetch = (id: number) => {
    return fetchData(`${API_BASE_URL}/api/v1/IncidentHistory/${id}`);
  };

  return { data, completed, error, fetch };
};

export default useFetchIncidenceHistory;
