import { ChatContextProvider } from "@/contexts/chat";
import BackendGuard from "@/guard/backend-guard";
import { RouterProvider } from "react-router-dom";
import router from "./router";

type Props = {};

const App = (_props: Props) => {
  return (
    <BackendGuard>
      <ChatContextProvider>
        <RouterProvider router={router} />
      </ChatContextProvider>
    </BackendGuard>
  );
};

export default App;
