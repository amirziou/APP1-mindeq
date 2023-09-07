import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";

import StatsPageTime from "./pages/StatsPageTime";
import SignIn from "./Auth/SignIn";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/chaine/:id", element: <StatsPageTime /> },
      // { path: "/#", element: <Contact /> },
      // { path: "/signin", element: <SignIn /> },
    ],
  },
]);

export default router;
