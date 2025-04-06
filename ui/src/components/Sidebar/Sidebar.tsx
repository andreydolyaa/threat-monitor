import "./Sidebar.css";
import SidebarItem from "./SidebarItem";
import { TbHome as Home } from "react-icons/tb";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <SidebarItem title="Dashboard" icon={Home} link="/" />
      <SidebarItem title="Logs" icon={Home} link="/logs" />
    </div>
  );
};

export default Sidebar;
