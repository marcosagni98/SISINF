import { useState } from "react";
import { useAuth } from "./useAuth";
import { Pagination } from "../interfaces/shared/Paginated";

interface FetchWithAutAndPaginationBaseResult<T> {
  data: Pagination<T> | null;
  completed: boolean;
  error: string | null;
  fetchData: (url: string) => Promise<void>;
}

const useFetchWithAuthAndPaginationBase = <T>(): FetchWithAutAndPaginationBaseResult<T> => {
  const [data, setData] = useState<Pagination<T> | null>(null);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { token } = useAuth();

  const fetchData = async (url: string, pageNumber = 1, pageSize = 10, search = "") => {
    setCompleted(false);
    setError(null);

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      };

      const config: RequestInit = {
        headers,
      };

      const response = await fetch(`${url}?PageNumber=${pageNumber}&PageSize=${pageSize}&Search=${encodeURIComponent(search)}`, config);
      if (!response.ok) throw new Error("Error fetching data");
      const result = await response.json();
      setData(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setCompleted(true);
    }
  };

  return { data, completed, error, fetchData };
};

export default useFetchWithAuthAndPaginationBase;
