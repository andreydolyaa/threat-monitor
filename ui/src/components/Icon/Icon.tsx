import { type IconType } from "react-icons";

type TIcon = {
  icon: IconType;
};

const Icon = ({ icon }: TIcon) => {
  const IconComponent = icon;
  return <IconComponent />;
};

export default Icon;
