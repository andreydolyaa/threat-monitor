import "./Layout.css";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <Topbar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
