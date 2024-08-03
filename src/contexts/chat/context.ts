import { IChatContext } from "@/types/chat";
import { createContext } from "react";

const defaultValue: IChatContext = {
  clientId: null,
  updateRoom: () => {},
  messages: [],
  roomId: null,
  sendMessage: () => {},
};

export const chatContext = createContext(defaultValue);
