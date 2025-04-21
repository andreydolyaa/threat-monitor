import "./Sidebar.css";
import Logo from "../Logo/Logo";
import { SidebarSectionItem, type SidebarItemType } from "../../types";
import SidebarItem from "./SidebarItem";
import SidebarTitle from "./SidebarTitle";
import {
  TbChartPie2,
  TbScript,
  TbReportAnalytics,
  TbBookmark,
  TbSettings,
  TbLogout,
  TbScanEye,
} from "react-icons/tb";
import { useUserStore } from "../../store/user";
import { useSidebarStore } from "../../store/sidebar";

const Sidebar = () => {
  const isCollapsed = useSidebarStore((state) => state.isSidebarCollapsed);
  const { logout } = useUserStore();

  const sections = [
    {
      title: "Logging & Monitoring",
      items: [
        { title: "Dashboard", icon: TbChartPie2, link: "/" },
        { title: "Logs", icon: TbReportAnalytics, link: "/logs" },
        { title: "Rules", icon: TbScript, link: "/rules" },
        { title: "Agents", icon: TbScanEye, link: "/agents" },
      ],
    },
    {
      title: "Threat Intelligence",
      items: [{ title: "Virus Total", icon: TbBookmark, link: "/virustotal" }],
    },
    {
      title: "System & Settings",
      items: [
        { title: "Settings", icon: TbSettings, link: "/settings" },
        { title: "Logout", icon: TbLogout, link: "/logout", action: logout },
      ],
    },
  ];

  const sectionItem = (section: SidebarSectionItem) => {
    return (
      <div key={section.title}>
        <SidebarTitle title={section.title} />
        {section.items.map((item: SidebarItemType) => {
          return sidebarItem(item);
        })}
      </div>
    );
  };

  const sidebarItem = (item: SidebarItemType) => {
    return (
      <SidebarItem
        key={item.title}
        title={item.title}
        icon={item.icon}
        link={item.link}
        action={item.action}
      />
    );
  };

  return (
    <div className={`sidebar ${!isCollapsed ? "sidebar-appear" : ""}`}>
      <Logo />
      <div className="items">
        {sections.map((section) => sectionItem(section))}
      </div>
    </div>
  );
};

export default Sidebar;
