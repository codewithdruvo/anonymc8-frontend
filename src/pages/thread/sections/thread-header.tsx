import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useChatContext } from "@/contexts/chat";
import { getDicebearDylan } from "@/lib/dicebear";
import { LucideArrowLeft, LucideCopy, LucideUser } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {};

const ThreadHeader = (_props: Props) => {
  const navigate = useNavigate();
  const { roomId, clientId } = useChatContext();

  const handleCopy = (text: string | null) => {
    if (!text) return;

    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex items-center justify-between py-5 gap-3 px-5">
      <Button size={"icon"} variant={"outline"} onClick={() => navigate(-1)}>
        <LucideArrowLeft />
      </Button>

      <div className="flex items-center gap-3">
        {/* <Avatar className="size-12 flex-shrink-0">
          <AvatarImage />
          <AvatarFallback>
            <LucideHash />
          </AvatarFallback>
        </Avatar> */}

        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{roomId}</h2>
            <LucideCopy
              size={16}
              className="cursor-pointer hover:text-primary select-none"
              onClick={() => handleCopy(roomId)}
            />
          </div>
          <p className="text-sm opacity-70">room</p>
        </div>
      </div>

      <Avatar>
        <AvatarImage src={clientId ? getDicebearDylan(clientId) : undefined} />
        <AvatarFallback className="bg-muted">
          <LucideUser />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ThreadHeader;
