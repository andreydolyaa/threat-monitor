import "./Logo.css";
import { TbShieldHalf, TbSelector } from "react-icons/tb";

const Logo = () => {
  return (
    <div className="logo">
      <div className="logo-and-text">
        <TbShieldHalf
          className="logo-icon"
          style={{ strokeWidth: 2, fontSize: 24, marginRight: 7 }}
        />

        <div>Threat Monitor</div>
      </div>
      <TbSelector className="sidebar-toggler" />
    </div>
  );
};

export default Logo;
