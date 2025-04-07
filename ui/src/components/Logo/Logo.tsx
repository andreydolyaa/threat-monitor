import "./Logo.css";
import { type ToggleSidebar } from "../../types";
import { TbShieldHalf, TbSelector } from "react-icons/tb";

const Logo = ({ toggleSidebar, isCollapsed }: ToggleSidebar) => {
  return (
    <div className="logo">
      <div className="logo-and-text">
        <TbShieldHalf
          className="logo-icon"
          style={{ strokeWidth: 2, fontSize: 24, marginRight: 7 }}
          onClick={() => isCollapsed && toggleSidebar()}
        />

        {!isCollapsed && <div>Threat Monitor</div>}
      </div>
      {!isCollapsed && (
        <TbSelector className="sidebar-toggler" onClick={toggleSidebar} />
      )}
    </div>
  );
};

export default Logo;
