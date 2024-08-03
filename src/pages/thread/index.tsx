import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatContext } from "@/contexts/chat";
import { getDicebearBottNeutral } from "@/lib/dicebear";
import { LucideUser } from "lucide-react";
import { useParams } from "react-router-dom";
import ThreadForm from "./thread-form";
import ThreadList from "./thread-list";

type Props = {};

const ThreadPage = (_props: Props) => {
  const { id } = useParams();
  const { getRoom } = useChatContext();

  const room = getRoom(id || "");

  if (!room) {
    return <div>Room Not Found</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex items-center px-10 py-5 gap-4">
        <Avatar className="size-14">
          <AvatarImage src={getDicebearBottNeutral(room)} />
          <AvatarFallback>
            <LucideUser />
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">{room}</h2>
          <p className="text-sm opacity-70">{room}</p>
        </div>
      </div>

      <ThreadList />

      <ThreadForm />
    </div>
  );
};

export default ThreadPage;
