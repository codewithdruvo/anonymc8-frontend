import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { useChatContext } from "@/contexts/chat";
import { LucideSend } from "lucide-react";
import { useCallback, useState } from "react";

type Props = {};

const ThreadForm = (_props: Props) => {
  const { sendMessage } = useChatContext();
  const [text, setText] = useState("");

  const handleSubmit = useCallback(() => {
    if (!text?.trim()) return;

    sendMessage(text);

    setText("");
  }, [sendMessage, text]);

  return (
    <div className="flex items-stretch gap-3 pb-10 px-5">
      <AutosizeTextarea
        placeholder="Write a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        rows={1}
        minHeight={40}
        maxHeight={60}
      />
      <Button size={"icon"} onClick={handleSubmit} className="h-full">
        <LucideSend size={18} />
      </Button>
    </div>
  );
};

export default ThreadForm;
