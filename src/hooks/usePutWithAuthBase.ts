import { useAuth } from "./useAuth";

interface FetchWithAuthBaseResult<T, Y> {
  putData: (url: string, body: Y) => Promise<{ data: T | null; error: string | null }>;
}

const usePutWithAuthBase = <T, Y>(): FetchWithAuthBaseResult<T, Y> => {
  const { token } = useAuth();

  const putData = async (url: string, body: Y): Promise<{ data: T | null; error: string | null }> => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      };

      const config: RequestInit = {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      };

      const response = await fetch(url, config);
      if (!response.ok) throw new Error("Error fetching data");

      const result = await response.json();
      return { data: result, error: null };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return { data: null, error: err.message };
      } else {
        return { data: null, error: "Unknown error occurred" };
      }
    }
  };

  return { putData };
};

export default usePutWithAuthBase;
