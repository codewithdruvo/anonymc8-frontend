import { useChatContext } from "@/contexts/chat";
import useFetch from "../use-fetch";

type Room = {
  id: string;
};

const useCreateRoomAPI = () => {
  const { clientId, updateRoom } = useChatContext();

  const { data, error, fetchData, loading } = useFetch<Room>();

  const handleFetch = async () => {
    if (!clientId) return;

    const response = await fetchData(
      `${import.meta.env.VITE_APP_BACKEND_URL}/chat/create-room`,
      { method: "POST", body: JSON.stringify({ clientId }) }
    );

    if (response.data?.id) {
      updateRoom(response.data.id);
    }

    return response;
  };

  return { data, error, loading, execute: handleFetch };
};

export default useCreateRoomAPI;
