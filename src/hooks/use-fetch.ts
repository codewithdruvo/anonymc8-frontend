import { useCallback, useState } from "react";

export interface FetchResult<T> {
  data: T | null;
  error: null | string;
}

export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  fetchData: (url: string, options?: RequestInit) => Promise<FetchResult<T>>;
}

const useFetch = <T>(defaultLoading = false): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(defaultLoading);
  const [error, setError] = useState<Error | null>(null);

  const fetchData: UseFetchResult<T>["fetchData"] = useCallback(
    async (url, options?) => {
      const fetchResult: FetchResult<T> = { data: null, error: null };

      try {
        setLoading(true);
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setData(data);

        fetchResult.data = data;
      } catch (error: any) {
        setError(error as Error);
        fetchResult.error = error?.message || "Something wents to wrong";
      } finally {
        setLoading(false);
      }

      return fetchResult;
    },
    []
  );

  return { data, loading, error, fetchData };
};

export default useFetch;
