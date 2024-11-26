import { API_BASE_URL } from "../../config";
import { IncidenceDetails } from "../../interfaces/incidences/IncidenceDetails";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

/** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom 'useFetchWithAuthBase' hook.
   * 'data' holds the fetched incidence details, 'completed' indicates if the fetch has finished,
   * 'error' contains any error message, and 'fetchData' is the function that triggers the data fetch request.
   */
const useFetchIncidence = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthBase<IncidenceDetails>();

  /** 
   * 'fetch' function: Accepts an incident ID and uses 'fetchData' to fetch the details of that particular incident.
   * It constructs the API endpoint URL dynamically based on the provided incident ID.
   * 
   * @param {number} id - The ID of the incident whose details are being fetched.
   * @returns {Promise} - A promise that resolves with the incident details when the request is completed.
   */
  const fetch = (id: number) => {
    return fetchData(`${API_BASE_URL}/api/v1/Incident/${id}`);
  };

  return { data, completed, error, fetch };
};

export default useFetchIncidence;
