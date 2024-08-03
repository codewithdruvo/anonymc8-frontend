import { useChatContext } from "@/contexts/chat";
import { useCallback } from "react";
import useFetch from "../use-fetch";

type Room = {
  id: string;
};

const useJoinRoomAPI = () => {
  const { updateRoom } = useChatContext();

  const { data, error, fetchData, loading } = useFetch<Room>();

  const handleFetch = useCallback(
    async (id: string, clientId: string) => {
      if (!clientId) return;

      const response = await fetchData(
        `${import.meta.env.VITE_APP_BACKEND_URL}/chat/join-room`,
        {
          method: "POST",
          body: JSON.stringify({ roomId: id, clientId }),
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );

      if (response.data?.id) {
        updateRoom(response.data.id);
      }

      return response;
    },
    [fetchData, updateRoom]
  );

  return { data, error, loading, execute: handleFetch };
};

export default useJoinRoomAPI;
