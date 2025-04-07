import "./Layout.css";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { Outlet } from "react-router";
import { useState } from "react";

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };
  return (
    <div
      className="layout"
      style={{ gridTemplateColumns: isCollapsed ? "70px 1fr" : "300px 1fr" }}>
      <Sidebar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
      <Topbar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
