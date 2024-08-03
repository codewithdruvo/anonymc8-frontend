import { Badge } from "@/components/ui/badge";
import { useChatContext } from "@/contexts/chat";
import { IMessage } from "@/types/chat";
import { useEffect, useRef } from "react";
import ThreadMessage from "./thread-message";

type Props = {};

const showAuthor = (current: IMessage, prev?: IMessage) => {
  if (!prev || ("type" in prev && prev.type === "MESSAGE_ALERT")) return true;

  return current.author !== prev.author;
};

const ThreadList = (_props: Props) => {
  const { contents } = useChatContext();
  const lastDivRef = useRef<HTMLDivElement>(null);

  const renderMessages = contents.map((message, i, arr) => {
    if ("type" in message && message.type === "MESSAGE_ALERT") {
      return (
        <div
          className="w-full text-center text-foreground/80 py-5 flex items-center justify-center"
          key={`${message.createdAt}-${i}`}
        >
          <Badge variant={"secondary"}>{message.text}</Badge>
        </div>
      );
    }

    return (
      <ThreadMessage
        key={`${message.createdAt}-${i}`}
        message={message}
        showAuthor={showAuthor(message, arr[i - 1])}
      />
    );
  });

  useEffect(() => {
    if (lastDivRef.current)
      lastDivRef.current.scrollIntoView({ behavior: "smooth" });
  }, [renderMessages]);

  return (
    <>
      <div className="flex flex-1 h-full flex-col px-10 overflow-y-auto pb-10">
        {renderMessages}
      </div>

      <div ref={lastDivRef} />
    </>
  );
};

export default ThreadList;
