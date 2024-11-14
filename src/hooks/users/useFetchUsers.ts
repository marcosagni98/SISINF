import { API_BASE_URL } from "../../config";
import { PaginationProps } from "../../interfaces/shared/PaginationProps";
import { UsersTableRow } from "../../interfaces/users/UsersTableRow";
import useFetchWithAuthAndPaginationBase from "../useFetchWithAuthAndPaginationBase";

/** 
 * Custom hook to fetch a list of users with authentication and pagination
 * This hook simplifies the process of retrieving users' data with pagination support.
 * @returns {Object} - Contains the data, completed status, error, and the fetch function for retrieving the user list with pagination
 */
const useFetchUsers = () => {
  const { data, completed, error, fetchData } =
    useFetchWithAuthAndPaginationBase<UsersTableRow>();

  /** 
   * Function to fetch the list of users with pagination
   * @param {PaginationProps} paginationProps - The pagination settings (e.g., page number, page size)
   * @returns {Promise<any>} - Returns a promise with the response from the API containing the paginated list of users
   */
  const fetch = (paginationProps: PaginationProps) => {
    return fetchData(`${API_BASE_URL}/api/v1/User`, paginationProps);
  };

  return { data, completed, error, fetch };
};

export default useFetchUsers;
