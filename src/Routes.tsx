import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import StatsPage from "./pages/StatsPage";
import HistoryData from "./firebase/HistoryData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/chaine/:id", element: <HistoryData /> },
    ],
  },
]);

export default router;
