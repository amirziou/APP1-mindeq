import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import StatsPage from "./pages/StatsPageHeure";
import HistoryData from "./firebase/HistoryData";
import PageTime from "./pages/PageTime";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/chaine/:id", element: <PageTime /> },
    ],
  },
]);

export default router;
