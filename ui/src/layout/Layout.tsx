import "./Layout.css";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { Outlet } from "react-router";
import { useSidebarStore } from "../store/sidebar";
import { useEffect } from "react";

const Layout = () => {
  const isCollapsed = useSidebarStore((state) => state.isSidebarCollapsed);

  return (
    <div className={`layout ${isCollapsed ? "collapsed" : ""}`}>
      <Sidebar />
      <Topbar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
