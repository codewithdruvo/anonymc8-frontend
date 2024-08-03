import useArrayData from "@/hooks/use-array-data";
import { IChatContext, IMessage } from "@/types/chat";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { chatContext } from "./context";

const events = {
  CREATE_MESSAGE: "create-message",
  NEW_MESSAGE: "new-message",
  JOIN_ROOM: "room-join",
};

type Props = { children: ReactNode };

export const ChatContextProvider = (props: Props) => {
  const { children } = props;

  const socket = useRef<Socket | null>(null);
  console.count("chat"); // debugging if there is multiple render

  const [clientId, setClientId] = useState<IChatContext["clientId"]>(null);
  const [roomId, setRoomId] = useState<IChatContext["roomId"]>(null);

  const messages = useArrayData<IMessage>([]);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://localhost:5000/socket/chat");

      socket.current.on("connect", () => {
        console.log("Client Connected: ", socket.current?.id);
        setClientId(socket.current?.id || null);
      });

      socket.current.on(events.NEW_MESSAGE, (data: IMessage) => {
        messages.addData(data);
      });
    }

    return () => {
      socket.current?.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle send message
  const sendMessage: IChatContext["sendMessage"] = useCallback(
    (text) => {
      if (!socket.current || !clientId || !roomId)
        return { error: true, message: "Couldn't establish connection" };

      const newMessage: IMessage = {
        text,
        author: clientId,
        room: roomId,
        createdAt: new Date().getTime(),
      };

      socket.current.emit(events.CREATE_MESSAGE, newMessage);
      messages.addData(newMessage);
    },
    [clientId, messages, roomId]
  );

  // update room
  const updateRoom: IChatContext["updateRoom"] = useCallback(
    (id) => {
      setRoomId((prev) => {
        if (prev !== id) messages.clearData(); // clear on room id change
        return id;
      });
    },
    [messages]
  );

  // sort & parse messages
  const parsedMessages = useMemo(() => {
    if (!Array.isArray(messages.data)) return [];

    const filterdData = messages.data.filter((m) => m.room === roomId);

    return filterdData.sort((a, b) => a.createdAt - b.createdAt);
  }, [messages.data, roomId]);

  // memorized values
  const value: IChatContext = useMemo(
    () => ({
      clientId,
      roomId,
      messages: parsedMessages,
      sendMessage,
      updateRoom,
    }),
    [clientId, updateRoom, parsedMessages, roomId, sendMessage]
  );

  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
};
