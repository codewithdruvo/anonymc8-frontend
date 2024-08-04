import { InfoCard } from "@/components/cards/info";
import useHealthAPI from "@/hooks/api/health-api";
import { LucideAlertTriangle, LucideLoader2 } from "lucide-react";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const BackendGuard = (props: Props) => {
  const { children } = props;
  const { data, error, loading, excute } = useHealthAPI();

  useEffect(() => {
    setTimeout(() => {
      excute();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading && error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <InfoCard
          title={"Connection Failed"}
          text={`Please try again later. currently we're not able to connect with backend server..`}
          icon={<LucideAlertTriangle className="animate-spin text-primary" />}
        />
      </div>
    );
  }

  if (!loading && data) {
    return <>{children}</>;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <InfoCard
        title={"Initializing Connection"}
        text={`checking all connections with backend server. sometime it may take 2-5 minute depends on backend response.`}
        icon={<LucideLoader2 className="animate-spin text-primary" />}
      />
    </div>
  );
};

export default BackendGuard;
