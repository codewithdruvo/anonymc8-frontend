import { Button } from "@/components/ui/button";
import useCreateRoomAPI from "@/hooks/api/create-room-api";
import paths from "@/routes/path";
import { LucideLoader2, LucideMessageSquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {};

const CreateButton = (_props: Props) => {
  const { loading, execute } = useCreateRoomAPI();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await execute();

    if (response?.data) {
      navigate(paths.thread(response.data.id));
    }
  };

  return (
    <>
      <Button
        variant={"default"}
        size={"lg"}
        className="gap-2"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? (
          <>
            <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          <>
            Create New
            <LucideMessageSquarePlus size={18} />
          </>
        )}
      </Button>
    </>
  );
};

export default CreateButton;
