import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ReactNode } from "react";

type Props = {
  title: string;
  text: string;
  icon?: ReactNode;
  actions?: ReactNode;
};

export const InfoCard = (props: Props) => {
  const { actions, icon, text, title } = props;
  return (
    <Card className="max-w-md min-w-[300px]">
      <CardHeader className="flex flex-row items-center justify-between w-full gap-2">
        <h2 className="font-bold text-xl">{title}</h2>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-sm opacity-75">{text}</p>
      </CardContent>
      {actions && <CardFooter>{actions}</CardFooter>}
    </Card>
  );
};
