import Root from "@/layouts/Root";
import BlogList from "@/pages/BlogList";
import BlogPost from "@/pages/BlogPost";
import GiftIdeas from "@/pages/GiftIdeas";
import GroupsLanding from "@/pages/landing/GroupsLanding";
import IdeasLanding from "@/pages/landing/IdeasLanding";
import MainLanding from "@/pages/landing/MainLanding";
import WishlistLanding from "@/pages/landing/WishlistLanding";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <MainLanding /> },
      { path: "for-groups", element: <GroupsLanding /> },
      { path: "create-wishlist", element: <WishlistLanding /> },
      { path: "what-to-send", element: <IdeasLanding /> },
      { path: "blog", element: <BlogList /> },
      { path: "blog/:slug", element: <BlogPost /> },
      { path: "ideas", element: <GiftIdeas /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
