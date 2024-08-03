import { IChatContext } from "@/types/chat";
import { createContext } from "react";

const defaultValue: IChatContext = {
  createGroup: () => {},
  getRoom: () => undefined,
  joinGroup: () => {},
  contents: [],
  rooms: [],
  userId: null,
  navigateRoom: () => {},
  sendMessage: () => {},
};

export const chatContext = createContext(defaultValue);
