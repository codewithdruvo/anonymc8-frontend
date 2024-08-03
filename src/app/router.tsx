import ChatLayout from "@/layouts/chat";
import HomePage from "@/pages/home";
import ThreadPage from "@/pages/thread";
import paths from "@/routes/path";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <ChatLayout />,
    children: [
      {
        element: <HomePage />,
        path: "/",
      },
      {
        element: <ThreadPage />,
        path: paths.thread.details(":id"),
      },
    ],
  },
]);

export default router;
