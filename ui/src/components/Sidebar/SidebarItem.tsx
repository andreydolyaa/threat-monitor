import { NavLink } from "react-router";
import { type SidebarItemType } from "../../types";

const SidebarItem = ({ title, icon, link, action }: SidebarItemType) => {
  const IconComponent = icon;
  
  return (
    <NavLink
      onClick={action ? action : undefined}
      className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
      to={link}>
      <IconComponent className="icon-component" />
      <div className="item-title">{title}</div>
    </NavLink>
  );
};

export default SidebarItem;
