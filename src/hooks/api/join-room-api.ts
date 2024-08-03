import { useChatContext } from "@/contexts/chat";
import useFetch from "../use-fetch";

type Room = {
  id: string;
};

const useJoinRoomAPI = () => {
  const { clientId, updateRoom } = useChatContext();

  const { data, error, fetchData, loading } = useFetch<Room>();

  const handleFetch = async (id: string) => {
    if (!clientId) return;

    const response = await fetchData(
      `${import.meta.env.VITE_APP_BACKEND_URL}/chat/join-room`,
      { method: "POST", body: JSON.stringify({ id, clientId }) }
    );

    if (response.data?.id) {
      updateRoom(response.data.id);
    }

    return response;
  };

  return { data, error, loading, execute: handleFetch };
};

export default useJoinRoomAPI;
