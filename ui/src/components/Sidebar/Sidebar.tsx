import Logo from "../Logo/Logo";
import "./Sidebar.css";
import SidebarItem from "./SidebarItem";
import {
  TbChartPie,
  TbUrgent,
  TbReportSearch,
  TbBookmark,
  TbSettings,
  TbLogout,
} from "react-icons/tb";
import SidebarTitle from "./SidebarTitle";
import { type ToggleSidebar } from "../../types";


const Sidebar = ({ toggleSidebar, isCollapsed }: ToggleSidebar) => {
  return (
    <div className="sidebar" style={{ width: isCollapsed ? "70px" : "300px" }}>
      <Logo toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
      <div className="items">
        <SidebarTitle title="Logging & Monitoring" />
        <SidebarItem title="Dashboard" icon={TbChartPie} link="/" />
        <SidebarItem title="Logs" icon={TbReportSearch} link="/logs" />
        <SidebarItem title="Alert Queue" icon={TbUrgent} link="/alerts" />
        <SidebarTitle title="Threat Intelligence" />
        <SidebarItem title="Virus Total" icon={TbBookmark} link="/virustotal" />
        <SidebarTitle title="System & Settings" />
        <SidebarItem title="Settings" icon={TbSettings} link="/settings" />
        <SidebarItem title="Logout" icon={TbLogout} link="/logout" />
      </div>
    </div>
  );
};

export default Sidebar;
