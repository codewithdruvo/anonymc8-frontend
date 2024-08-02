import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/left-sidebar";
import WelcomeAlert from "./components/welcome-alert";

type Props = {};

const ChatLayout = (_props: Props) => {
  return (
    <div>
      <div className="fixed inset-0 bg-background w-[350px] h-full border-r px-5">
        <LeftSidebar />
      </div>
      <div className="ml-[350px]">
        <Outlet />
      </div>
      <WelcomeAlert />
    </div>
  );
};

export default ChatLayout;
