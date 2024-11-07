import { API_BASE_URL } from "../../config";
import { IncidenceDetails } from "../../interfaces/incidences/IncidenceDetails";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

const useFetchIncidence = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthBase<IncidenceDetails>();

  const fetch = (id: number) => {
    return fetchData(`${API_BASE_URL}/api/v1/Incident/${id}`);
  };

  return { data, completed, error, fetch };
};

export default useFetchIncidence;
