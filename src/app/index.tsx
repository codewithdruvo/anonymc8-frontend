import { ChatContextProvider } from "@/contexts/chat";
import { RouterProvider } from "react-router-dom";
import router from "./router";

type Props = {};

const App = (_props: Props) => {
  return (
    <ChatContextProvider>
      <RouterProvider router={router} />
    </ChatContextProvider>
  );
};

export default App;
