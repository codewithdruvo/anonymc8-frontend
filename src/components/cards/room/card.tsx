import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideUser } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  avatar: string;

  onClick?: () => void;
};

export const RoomCard = (props: Props) => {
  const { avatar, subtitle, title, onClick } = props;

  return (
    <Card
      className={cn(onClick ? "hover:bg-muted/50 cursor-pointer" : "")}
      onClick={onClick}
    >
      <CardContent className="flex flex-row items-center py-3 px-4 m-0 gap-3">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>
            <LucideUser />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm opacity-60">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
};
