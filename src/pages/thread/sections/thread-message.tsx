import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useChatContext } from "@/contexts/chat";
import { getDicebearDylan } from "@/lib/dicebear";
import { cn } from "@/lib/utils";
import { IMessage } from "@/types/chat";
import { LucideUser } from "lucide-react";

type Props = {
  message: IMessage;
  showAuthor: boolean;
};

const ThreadMessage = (props: Props) => {
  const { message, showAuthor } = props;

  const { clientId } = useChatContext();

  if (message.author) {
    return (
      <div
        className={cn(
          "w-full flex flex-col gap-2",
          clientId === message.author ? "items-end text-right" : "items-start"
        )}
      >
        {showAuthor && (
          <div
            className={cn(
              "flex items-center text-xs text-foreground/80 gap-2 mt-10",
              clientId === message.author ? "flex-row-reverse" : ""
            )}
          >
            <Avatar className="size-6">
              <AvatarImage src={getDicebearDylan(message.author)} />
              <AvatarFallback>
                <LucideUser />
              </AvatarFallback>
            </Avatar>
            <h4>{message.author}</h4>
          </div>
        )}
        <Card
          className={cn(
            "max-w-[500px] min-w-[100px] mb-2",
            clientId === message.author ? "mr-7" : "ml-7"
          )}
        >
          <CardContent className="px-4 py-3">
            <p>{message.text}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default ThreadMessage;
