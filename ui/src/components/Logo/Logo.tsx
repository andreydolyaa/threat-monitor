import "./Logo.css";
import { useStore } from "../../store/useStore";
import { TbShieldHalf, TbSelector } from "react-icons/tb";

type LogoProps = {
  isInLogin: boolean;
};

const Logo = ({ isInLogin = false }: LogoProps) => {
  const isCollapsed = useStore((state) => state.isSidebarCollapsed);
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  return (
    <div className="logo">
      <div className="logo-and-text">
        <TbShieldHalf
          className="logo-icon"
          onClick={!isInLogin ? () => isCollapsed && toggleSidebar() : undefined}
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
