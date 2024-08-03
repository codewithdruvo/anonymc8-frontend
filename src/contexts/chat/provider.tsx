import useArrayData from "@/hooks/use-array-data";
import { IChatContext, IMessage, IMessageAlert } from "@/types/chat";
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

type Props = { children: ReactNode };

export const ChatContextProvider = (props: Props) => {
  const { children } = props;

  const socket = useRef<Socket | null>(null);

  console.count("chat");

  const [userId, setUserId] = useState<string | null>(null);
  const [room, setRoom] = useState<string | null>(null);

  const rooms = useArrayData<string>([]);
  const messages = useArrayData<IMessage | IMessageAlert>([]);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://localhost:5000/socket/chat");

      socket.current.on("connect", () => {
        console.log("Socket Connected: ", socket.current?.id);
        setUserId(socket.current?.id || null);
      });

      socket.current.on("group-new", (data: string) => {
        rooms.addData(data);
      });

      socket.current.on("new-message", (data: IMessage) => {
        messages.addData(data);
      });

      socket.current.on("group-new-member", (data: IMessageAlert) => {
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
      if (!socket.current || !userId || !room) return;

      const newMessage: IMessage = {
        text,
        author: userId,
        createdAt: new Date().getTime(),
        room,
      };

      socket.current.emit("message", newMessage);
      messages.addData(newMessage);
    },
    [messages, room, userId]
  );

  // handle navigate room
  const navigateRoom: IChatContext["navigateRoom"] = useCallback(
    (id) => {
      setRoom(id);

      messages.clearData();
    },
    [messages]
  );

  // get room
  const getRoom: IChatContext["getRoom"] = useCallback(
    (id) => {
      if (!Array.isArray(rooms.data)) return undefined;

      return rooms.data.find((r) => r === id);
    },
    [rooms.data]
  );

  // handle send message
  const createGroup: IChatContext["createGroup"] = useCallback(() => {
    if (!socket.current || !userId) return;

    socket.current.emit("group-create");
  }, [userId]);

  // handle send message
  const joinGroup: IChatContext["joinGroup"] = useCallback(
    (id) => {
      if (!socket.current || !userId) return;

      socket.current.emit("group-join", id);
      rooms.addData(id);
    },
    [rooms, userId]
  );

  // sort messages by createdAt
  const contents = useMemo(() => {
    if (!Array.isArray(messages.data)) return [];

    const filterdData = messages.data.filter((m) => m.room === room);

    return filterdData.sort((a, b) => a.createdAt - b.createdAt);
  }, [messages.data, room]);

  // memorized values
  const value: IChatContext = useMemo(
    () => ({
      userId,
      contents,
      navigateRoom,
      rooms: rooms.data,
      sendMessage,
      getRoom,
      createGroup,
      joinGroup,
    }),
    [
      contents,
      createGroup,
      getRoom,
      joinGroup,
      navigateRoom,
      rooms.data,
      sendMessage,
      userId,
    ]
  );

  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
};
