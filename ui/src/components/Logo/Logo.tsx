import "./Logo.css";
import { useStore } from "../../store/useStore";
import { TbShieldHalf, TbSelector } from "react-icons/tb";

const Logo = () => {
  const isCollapsed = useStore((state) => state.isSidebarCollapsed);
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  return (
    <div className="logo">
      <div className="logo-and-text">
        <TbShieldHalf
          className="logo-icon"
          onClick={() => isCollapsed && toggleSidebar()}
        />
        <div className="title">Threat Monitor</div>
      </div>
      <TbSelector className="sidebar-toggler" onClick={toggleSidebar} />
    </div>
  );
};

export default Logo;
