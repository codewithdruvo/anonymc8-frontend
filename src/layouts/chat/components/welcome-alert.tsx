import { RoomCard } from "@/components/cards/room";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useChatContext } from "@/contexts/chat";
import { getDicebearDylan } from "@/lib/dicebear";
import { DialogDescription } from "@radix-ui/react-dialog";

type Props = {};

const WelcomeAlert = (_props: Props) => {
  const { profile } = useChatContext();

  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to AnoNymC8</DialogTitle>
          <DialogDescription>
            Where chat starts anonymously. Each time you refresh you will have
            new profile. Here is your current profile.
          </DialogDescription>
        </DialogHeader>
        <div>
          {profile && (
            <RoomCard
              title={profile.username}
              subtitle={profile.id}
              avatar={getDicebearDylan(profile.id)}
            />
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Continue</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeAlert;
