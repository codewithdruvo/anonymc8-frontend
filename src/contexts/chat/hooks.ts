import { useContext } from "react";
import { chatContext } from "./context";

export const useChatContext = () => useContext(chatContext);
