import { NavLink } from "react-router";
import { useStore } from "../../store/useStore";
import { type SidebarItemType } from "../../types";

const SidebarItem = ({ title, icon, link }: SidebarItemType) => {
  const isCollapsed = useStore((state) => state.isSidebarCollapsed);

  const IconComponent = icon;
  return (
    <NavLink
      className={({ isActive }) =>
        `sidebar-item ${isActive ? "active" : ""} ${
          isCollapsed ? "sidebar-collapsed" : ""
        }`
      }
      to={link}>
      <IconComponent className="icon-component" />
      {!isCollapsed && <div>{title}</div>}
    </NavLink>
  );
};

export default SidebarItem;
