import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import TimeSelector from "../components/TimeSelector";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
