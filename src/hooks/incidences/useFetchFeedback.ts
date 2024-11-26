import { API_BASE_URL } from "../../config";
import { IncidenceFeedback } from "../../interfaces/incidences/IncidenceFeedback";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

const useFetchFeedback = () => {
  /** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom 'useFetchWithAuthBase' hook.
   * 'data' contains the feedback data, 'completed' indicates whether the fetch operation has finished,
   * 'error' stores any error message, and 'fetchData' is the function that triggers the fetch request.
   */
  const { data, completed, error, fetchData } =
  useFetchWithAuthBase<IncidenceFeedback>();

  /** 
   * 'fetch' function: Accepts an incident ID and uses 'fetchData' to fetch the feedback associated with that particular incident.
   * It constructs the API endpoint URL dynamically based on the provided ID.
   * 
   * @param {number} id - The ID of the incident whose feedback is being fetched.
   * @returns {Promise} - A promise that resolves with the feedback data when the request is completed.
   */
  const fetch = (id: number) => {
    return fetchData(`${API_BASE_URL}/api/v1/UserFeedback/by-incidence/${id}`);
  };

  return { data, completed, error, fetch };
};

export default useFetchFeedback;
