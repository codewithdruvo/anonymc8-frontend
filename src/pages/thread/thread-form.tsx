import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
    <div className="flex items-start px-10 gap-5 pb-10">
      <Textarea
        placeholder="Write a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          console.log(e.code);

          if (e.code === "Enter" && !e.shiftKey) {
            handleSubmit();
          }
        }}
      />
      <Button className="gap-2" onClick={handleSubmit}>
        Send <LucideSend size={18} />
      </Button>
    </div>
  );
};

export default ThreadForm;
