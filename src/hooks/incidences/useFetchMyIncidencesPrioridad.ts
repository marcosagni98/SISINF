import { API_BASE_URL } from "../../config";
import { IncidencePriority } from "../../enums/incidencePriority";
import { IncidencesTableRow } from "../../interfaces/incidences/IncidencesTableRow";
import { PaginationProps } from "../../interfaces/shared/PaginationProps";
import useFetchWithAuthAndPaginationBase from "../useFetchWithAuthAndPaginationBase";

const useFetchMyIncidencesPrioridad = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthAndPaginationBase<IncidencesTableRow>();

  const fetch = (paginationProps: PaginationProps, prioridad: IncidencePriority) => {
    return fetchData(`${API_BASE_URL}/api/v1/Incident/by-priority/${prioridad}`, paginationProps);
  };

  return { data, completed, error, fetch };
};

export default useFetchMyIncidencesPrioridad;
