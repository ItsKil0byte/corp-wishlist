import Root from "@/layouts/Root";
import Landing from "@/pages/Landing";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ index: true, element: <Landing /> }],
  },
]);
