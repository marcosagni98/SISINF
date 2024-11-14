import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { IncidentCountByDateArray } from "../../interfaces/statistics/IncidencesByDay";

const useFetchIncidencesByDay = () => {
  /** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom 'useFetchWithAuthBase' hook.
   * 'fetchData' is the function used to send authenticated GET requests and fetch data from the API.
   * The response type is 'IncidentCountByDateArray', which defines the structure of the data returned for the incidence count by date.
   */
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<IncidentCountByDateArray>();

    /** 
   * 'fetch' function: Calls 'fetchData' to send a GET request to the API to fetch the count of incidents grouped by day.
   * It constructs the API endpoint URL for the incidences statistics by day.
   * 
   * @returns {Promise} - A promise that resolves with the response when the request is completed.
   */
  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/Statistics/incidences-by-day`);
  };

  

  return { data, completed, error, fetch };
};

export default useFetchIncidencesByDay;
