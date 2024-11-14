import { API_BASE_URL } from "../../config";
import { PaginationProps } from "../../interfaces/shared/PaginationProps";
import { UsersTableRow } from "../../interfaces/users/UsersTableRow";
import useFetchWithAuthAndPaginationBase from "../useFetchWithAuthAndPaginationBase";

const useFetchUsers = () => {

  /** 
   * Destructure 'data', 'completed', 'error', and 'fetchData' from the custom hook 'useFetchWithAuthAndPaginationBase'.
   * 'useFetchWithAuthAndPaginationBase' is designed to handle authenticated GET requests with pagination.
   * The response type is 'UsersTableRow', which represents the user data.
   */
  const { data, completed, error, fetchData } =
  useFetchWithAuthAndPaginationBase<UsersTableRow>();

  /** 
   * 'fetch' function: Accepts 'paginationProps' as a parameter, which contains pagination settings like page number and page size.
   * This function calls 'fetchData' to send a GET request to the API for fetching user data with pagination.
   * 
   * @param {PaginationProps} paginationProps - The pagination settings (e.g., page number, page size).
   * @returns {Promise} - A promise that resolves with the response data from the API containing user information.
   */
  const fetch = (paginationProps: PaginationProps) => {
    return fetchData(`${API_BASE_URL}/api/v1/User`, paginationProps);
  };

  return { data, completed, error, fetch };
};

export default useFetchUsers;
