import useFetch from "../use-fetch";

type Room = {
  id: string;
};

const useHealthAPI = () => {
  const { data, error, fetchData, loading } = useFetch<Room>(true);

  const excute = () =>
    fetchData(import.meta.env.VITE_APP_BACKEND_API_URL + "/health");

  return { data, error, loading, excute };
};

export default useHealthAPI;
