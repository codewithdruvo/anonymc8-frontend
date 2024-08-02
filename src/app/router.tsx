import GroupPage from "@/pages/group";
import HomePage from "@/pages/home";
import PersonalPage from "@/pages/personal";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
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
]);

export default router;
