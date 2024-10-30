import useFetchWithAuthBase from "../useFetchWithAuthBase";
import { API_BASE_URL } from "../../config";
import { HistoricTableRow } from "../../interfaces/historic/HistoricTableRow";

const useFetchHistoric = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthBase<HistoricTableRow[]>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/historic`);
  };

  return { data, completed, error, fetch };
};

export default useFetchHistoric;
