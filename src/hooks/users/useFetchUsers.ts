import useFetchBase from "../useFetchBase";
import { API_BASE_URL } from "../../config";
import { UsersTableRow } from "../../interfaces/users/UsersTableRow";

const useFetchUsers = () => {
  const { data, completed, error, fetchData } =
    useFetchBase<UsersTableRow[]>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/users`);
  };

  return { data, completed, error, fetch };
};

export default useFetchUsers;
