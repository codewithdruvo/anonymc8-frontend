import { RoomCard } from "@/components/cards/room";
import { Button } from "@/components/ui/button";
import { useChatContext } from "@/contexts/chat";
import { getDicebearBottNeutral } from "@/lib/dicebear";
import paths from "@/routes/path";
import { useNavigate } from "react-router-dom";
import JoinRoom from "./join-room";

type Props = {};

const LeftSidebar = (_props: Props) => {
  const { rooms, navigateRoom, createGroup } = useChatContext();
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigateRoom(id);
    if (id) navigate(paths.thread.details(id));
  };

  return (
    <div className="py-5">
      <h1 className="font-bold text-2xl mb-5">AnoNymC8</h1>

      <div className="flex items-center gap-2 mb-10">
        <Button className="flex-1" onClick={createGroup}>
          New Room
        </Button>
        <JoinRoom />
      </div>

      <div className="flex flex-col gap-2">
        {rooms.map((p) => (
          <RoomCard
            key={p}
            avatar={getDicebearBottNeutral(p)}
            subtitle={p}
            title={p}
            onClick={() => handleNavigate(p)}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
