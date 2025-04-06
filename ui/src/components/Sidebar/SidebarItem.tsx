import { NavLink } from "react-router";
import { type IconType } from "react-icons";

type SidebarItem = {
  title: string;
  icon: IconType;
  link: string;
};

const SidebarItem = ({ title, icon, link }: SidebarItem) => {
  const IconComponent = icon;
  return (
    <NavLink className="sidebar-item" to={link}>
      <IconComponent />
      <div>{title}</div>
    </NavLink>
  );
};

export default SidebarItem;
