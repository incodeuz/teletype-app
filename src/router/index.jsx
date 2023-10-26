import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import Layout from "../layout";
import Details from "../pages/Details";
import CreatePost from "../pages/Post/CreatePost";
import EditPost from "../pages/Post/EditPost";
import ErrorPage from "../pages/Error";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/user/:id",
        element: <Profile />,
      },
      {
        path: "details/:id",
        element: <Details />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
      {
        path: "edit-post",
        element: <EditPost />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
