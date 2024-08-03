import useJoinRoomAPI from "@/hooks/api/join-room-api";
import { LucideLoader2 } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ThreadForm from "./sections/thread-form";
import ThreadHeader from "./sections/thread-header";
import ThreadList from "./sections/thread-list";

type Props = {};

const ThreadPage = (_props: Props) => {
  const { id } = useParams();
  const { error, loading, execute, data } = useJoinRoomAPI();

  // join thread
  useEffect(() => {
    if (id) {
      execute(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!loading && error) {
    return <>Error</>;
  }

  if (!loading && !data) {
    return <>Not Found</>;
  }

  if (!loading && data) {
    return (
      <div className="flex flex-col w-full h-screen">
        <ThreadHeader />

        <ThreadList />

        <ThreadForm />
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
