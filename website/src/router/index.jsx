import Root from "@/layouts/Root";
import BlogList from "@/pages/BlogList";
import BlogPost from "@/pages/BlogPost";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Landing /> },
      { path: "blog", element: <BlogList /> },
      { path: "blog/:slug", element: <BlogPost /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
