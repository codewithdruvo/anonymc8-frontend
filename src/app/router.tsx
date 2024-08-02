import ChatLayout from "@/layouts/chat";
import GroupPage from "@/pages/group";
import HomePage from "@/pages/home";
import PersonalPage from "@/pages/personal";
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
        element: <PersonalPage />,
        path: "/personal/:id",
      },
      {
        element: <GroupPage />,
        path: "/group/:id",
      },
    ],
  },
]);

export default router;
