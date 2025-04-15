import "./Badge.css";
import { RGBalphaText } from "../../utils/index";

type BadgeProps = { color: string; text: string };

const Badge = ({ color, text }: BadgeProps) => {
  return (
    <div
      className="badge"
      style={{ backgroundColor: color, color: RGBalphaText(color, 1) }}>
      {text}
    </div>
  );
};

export default Badge;
