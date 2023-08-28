import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import StatsPage from "./pages/StatsPageHeure";
import HistoryData from "./firebase/HistoryData";
import StatsPageTime from "./pages/StatsPageTime";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/chaine/:id", element: <StatsPageTime /> },
    ],
  },
]);

export default router;
