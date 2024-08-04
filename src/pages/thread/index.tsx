import { InfoCard } from "@/components/cards/info";
import { Button } from "@/components/ui/button";
import { useChatContext } from "@/contexts/chat";
import useJoinRoomAPI from "@/hooks/api/join-room-api";
import paths from "@/routes/path";
import { LucideAlertTriangle, LucideLoader2 } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ThreadForm from "./sections/thread-form";
import ThreadHeader from "./sections/thread-header";
import ThreadList from "./sections/thread-list";

type Props = {};

const ThreadPage = (_props: Props) => {
  const { id } = useParams();
  const { clientId } = useChatContext();
  const { error, loading, execute, data } = useJoinRoomAPI();

  console.log({ error });

  // join thread
  useEffect(() => {
    if (id && clientId) {
      execute(id, clientId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, clientId]);

  if (!loading && error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <InfoCard
          title={error?.message || "Something went to wrong"}
          text={`The room you're looking for, maybe it's not available now. Please try again later or try with different room`}
          icon={<LucideAlertTriangle className="text-primary" />}
          actions={
            <Link to={paths.root}>
              <Button>Back to home</Button>
            </Link>
          }
        />
      </div>
    );
  }

  if (!loading && data) {
    return (
      <div className="w-full bg-muted/20">
        <div className="flex flex-col shadow-lg max-w-screen-md mx-auto h-screen bg-background border px-5">
          <ThreadHeader />

          <ThreadList />

          <ThreadForm />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LucideLoader2 className="animate-spin" size={32} />
    </div>
  );
};

export default ThreadPage;
