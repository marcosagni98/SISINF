import { useState } from "react";

interface PostBaseResult<T, Y> {
  data: T | null;
  completed: boolean;
  error: string | null;
  postData: (url: string, body: Y) => Promise<void>;
}

const usePostBase = <T, Y>(): PostBaseResult<T, Y> => {
  const [data, setData] = useState<T | null>(null);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async (url: string, body: Y) => {
    setCompleted(false);
    setError(null);

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const config: RequestInit = {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      };

      const response = await fetch(url, config);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error fetching data");
      }
      const result = await response.json();
      setData(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
    } finally {
      setCompleted(true);
    }
  };

  return { data, completed, error, postData };
};

export default usePostBase;
