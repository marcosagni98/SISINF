import { API_BASE_URL } from "../../config";
import { IncidenceMessage } from "../../interfaces/incidences/IncidenceMessage";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

const useFetchMessages = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthBase<IncidenceMessage[]>();

  const fetch = (id: number) => {
    return fetchData(`${API_BASE_URL}/api/v1/Message/${id}`);
  };

  return { data, completed, error, fetch };
};

export default useFetchMessages;
