import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { LucideUser } from "lucide-react";

type Props = {};

const LeftSidebar = (_props: Props) => {
  return (
    <div className="py-5">
      <h1 className="font-bold text-2xl mb-10">AnoNym Chats</h1>

      <div className="flex flex-col">
        <Card className="hover:bg-muted/50 cursor-pointer">
          <CardContent className="flex flex-row items-center py-3 px-4 m-0 gap-3">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>
                <LucideUser />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h2 className="font-semibold">JhonDoe</h2>
              <p className="text-sm opacity-60">dlfjlskuiaodjlksad</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeftSidebar;
