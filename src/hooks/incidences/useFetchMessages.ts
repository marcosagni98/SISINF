import { API_BASE_URL } from "../../config";
import { IncidenceMessage } from "../../interfaces/incidences/IncidenceMessage";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

 /** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom 'useFetchWithAuthBase' hook.
   * 'data' holds the fetched messages, 'completed' indicates if the fetch operation is finished,
   * 'error' contains any error message, and 'fetchData' is the function used to trigger the API request.
   */
const useFetchMessages = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthBase<IncidenceMessage[]>();

  /** 
   * 'fetch' function: Accepts an incident ID and uses 'fetchData' to fetch the messages associated with that particular incident.
   * It constructs the API endpoint URL dynamically based on the provided incident ID.
   * 
   * @param {number} id - The ID of the incident whose messages are being fetched.
   * @returns {Promise} - A promise that resolves with the messages when the request is completed.
   */
  const fetch = (id: number) => {
    return fetchData(`${API_BASE_URL}/api/v1/Message/${id}`);
  };

  return { data, completed, error, fetch };
};

export default useFetchMessages;
