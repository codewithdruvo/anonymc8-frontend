import { Badge } from "@/components/ui/badge";
import { useChatContext } from "@/contexts/chat";
import { IMessage } from "@/types/chat";
import { useEffect, useRef } from "react";
import ThreadMessage from "./thread-message";

// ----------------------------------------------------------------------

type MessageNoticeProps = {
  message: IMessage;
};

const MessageNotice = (props: MessageNoticeProps) => {
  const { message } = props;
  return (
    <div className="w-full text-center text-foreground/80 py-5 flex items-center justify-center">
      <Badge variant={"secondary"}>{message.text}</Badge>
    </div>
  );
};

// ----------------------------------------------------------------------

type Props = {};

const showAuthor = (current: IMessage, prev?: IMessage) => {
  if (!prev || ("type" in prev && prev.type === "MESSAGE_ALERT")) return true;

  return current.author !== prev.author;
};

const ThreadList = (_props: Props) => {
  const { messages } = useChatContext();
  const lastDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastDivRef.current)
      lastDivRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="flex flex-1 h-full flex-col px-6 sm:px-10 overflow-y-auto pb-10">
        {messages.map((message, i, arr) => {
          if (message.author === "NOTICE") {
            return (
              <MessageNotice
                message={message}
                key={`${message.createdAt}-${i}`}
              />
            );
          }

          return (
            <ThreadMessage
              key={`${message.createdAt}-${i}`}
              message={message}
              showAuthor={showAuthor(message, arr[i - 1])}
            />
          );
        })}
      </div>

      <div ref={lastDivRef} />
    </>
  );
};

export default ThreadList;
