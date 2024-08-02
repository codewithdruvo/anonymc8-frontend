import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { LucideUser } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  avatar: string;
};

export const ProfileCard = (props: Props) => {
  const { avatar, subtitle, title } = props;

  return (
    <Card className="hover:bg-muted/50 cursor-pointer">
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
