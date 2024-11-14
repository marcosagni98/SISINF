import { API_BASE_URL } from "../../config";
import { UsersTableRow } from "../../interfaces/users/UsersTableRow";
import useFetchWithAuthBase from "../useFetchWithAuthBase";

const useFetchTechnicians = () => {
  const { data, completed, error, fetchData } =
  useFetchWithAuthBase<UsersTableRow[]>();

  const fetch = () => {
    return fetchData(`${API_BASE_URL}/api/v1/User/technicians`);
  };

  return { data, completed, error, fetch };
};

export default useFetchTechnicians;
