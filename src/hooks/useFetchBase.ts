import { useState } from "react";

interface FetchBaseResult<T> {
  data: T | null;
  completed: boolean;
  error: string | null;
  fetchData: (url: string) => Promise<void>;
}

const useFetchBase = <T>(): FetchBaseResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (url: string) => {
    setCompleted(false);
    setError(null);

    try {
      const response = await fetch(url);
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

export default useFetchBase;
