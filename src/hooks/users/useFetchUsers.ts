import { API_BASE_URL } from "../../config";
import { PaginationProps } from "../../interfaces/shared/PaginationProps";
import { UsersTableRow } from "../../interfaces/users/UsersTableRow";
import useFetchWithAuthAndPaginationBase from "../useFetchWithAuthAndPaginationBase";

const useFetchUsers = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthAndPaginationBase<UsersTableRow>();

  const fetch = (paginationProps: PaginationProps) => {
    return fetchData(`${API_BASE_URL}/api/v1/User`, paginationProps);
  };

  return { data, completed, error, fetch };
};

export default useFetchUsers;
