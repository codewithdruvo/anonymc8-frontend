import AutoScrollBox from "@/components/common/auto-scroll-box";
import { Badge } from "@/components/ui/badge";
import { useChatContext } from "@/contexts/chat";
import { IMessage } from "@/types/chat";
import { LucideMessageSquareDashed } from "lucide-react";
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

  if (messages.length > 0) {
    return (
      <>
        <AutoScrollBox
          className="flex flex-1 h-full flex-col px-5"
          dependencies={[messages]}
          targetClassName="pb-10"
        >
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
        </AutoScrollBox>
      </>
    );
  }

  return (
    <div className="flex flex-1 h-full flex-col px-5 items-center justify-center">
      <LucideMessageSquareDashed className="opacity-40 mb-4" size={50} />
      <p className="opacity-40">Be first to start the conversation</p>
    </div>
  );
};

export default ThreadList;
