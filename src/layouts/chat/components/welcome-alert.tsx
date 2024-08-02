import { ProfileCard } from "@/components/cards/profile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

type Props = {};

const WelcomeAlert = (_props: Props) => {
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
          <ProfileCard title="Jhon Doe" subtitle="helloworld" avatar="" />
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
