import "./Logo.css";
import { TbShieldHalf, TbSelector } from "react-icons/tb";
import { useSidebarStore } from "../../store/sidebar";

type LogoProps = {
  isInLogin?: boolean;
};

const Logo = ({ isInLogin = false }: LogoProps) => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebarStore();
  return (
    <div className="logo">
      <div className="logo-and-text">
        <TbShieldHalf
          className="logo-icon"
          onClick={
            !isInLogin ? () => isSidebarCollapsed && toggleSidebar() : undefined
          }
        />
        <div className="title">Threat Monitor</div>
      </div>
      {!isInLogin && (
        <TbSelector className="sidebar-toggler" onClick={toggleSidebar} />
      )}
    </div>
  );
};

export default Logo;
