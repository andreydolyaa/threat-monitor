import Logo from "../Logo/Logo";
import "./Sidebar.css";
import SidebarItem from "./SidebarItem";
import {
  TbChartPie,
  TbUrgent,
  TbAlignBoxLeftMiddle,
  TbBookmark,
  TbSettings,
  TbLogout,
} from "react-icons/tb";
import SidebarTitle from "./SidebarTitle";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Logo />
      <div className="items">
        <SidebarTitle title="Logging & Monitoring" />
        <SidebarItem
          title="Dashboard"
          icon={TbChartPie}
          link="/"
        />
        <SidebarItem title="Logs" icon={TbAlignBoxLeftMiddle} link="/logs" />
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
