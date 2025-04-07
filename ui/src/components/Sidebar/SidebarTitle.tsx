import "./Sidebar.css";

type SidebarTitle = {
  title: string;
};

const SidebarTitle = ({ title }: SidebarTitle) => {
  return <div className="sidebar-title">{title}</div>;
};

export default SidebarTitle;
