import { RouterProvider } from "react-router-dom";
import router from "./router";

type Props = {};

const App = (_props: Props) => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
