import { type IconType } from "react-icons";

type TIcon = {
  icon: IconType;
};

const Icon = ({ icon }: TIcon) => {
  const IconComponent = icon;
  return <IconComponent style={{ strokeWidth: 1.5 }} />;
};

export default Icon;
