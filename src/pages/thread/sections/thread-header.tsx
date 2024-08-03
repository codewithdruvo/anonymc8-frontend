import { Button } from "@/components/ui/button";
import { useChatContext } from "@/contexts/chat";
import { getDicebearBottNeutral, getDicebearDylan } from "@/lib/dicebear";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LucideArrowLeft, LucideUser, LucideUsers } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {};

const ThreadHeader = (_props: Props) => {
  const navigate = useNavigate();
  const { roomId, clientId } = useChatContext();

  return (
    <div className="flex items-center px-5 sm:px-10 py-5 gap-4">
      <Button
        size={"icon"}
        variant={"ghost"}
        className="mr-3 sm:hidden"
        onClick={() => navigate(-1)}
      >
        <LucideArrowLeft />
      </Button>

      <Avatar className="size-12 sm:size-14">
        <AvatarImage src={roomId ? getDicebearBottNeutral(roomId) : ""} />
        <AvatarFallback>
          <LucideUsers />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col mr-auto">
        <h2 className="text-xl sm:text-2xl font-semibold">{roomId}</h2>
        <p className="text-sm opacity-70">room</p>
      </div>

      <Avatar>
        <AvatarImage src={clientId ? getDicebearDylan(clientId) : ""} />
        <AvatarFallback>
          <LucideUser />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ThreadHeader;
