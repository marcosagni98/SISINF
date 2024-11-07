interface PostBaseResult<T, Y> {
  postData: (url: string, body: Y) => Promise<{ data: T | null; error: string | null }>;
}

const usePostBase = <T, Y>(): PostBaseResult<T, Y> => {
  const postData = async (url: string, body: Y): Promise<{ data: T | null; error: string | null }>  => {
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

  return { postData };
};

export default usePostBase;
