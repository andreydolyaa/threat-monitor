import { NavLink } from "react-router";
import { type IconType } from "react-icons";
import { TbChevronRight } from "react-icons/tb";
import { Icon } from "../Icon";

type SidebarItem = {
  title: string;
  icon: IconType;
  link: string;
};

const SidebarItem = ({ title, icon, link }: SidebarItem) => {
  const IconComponent = icon;
  return (
    <NavLink className="sidebar-item" to={link}>
      <IconComponent style={{ strokeWidth: 1.5, fontSize: 18, marginRight: 7 }} />
      <div>{title}</div>
      <TbChevronRight
        style={{ strokeWidth: 1.5, fontSize: 18, marginLeft: "auto" }}
      />
    </NavLink>
  );
};

export default SidebarItem;
