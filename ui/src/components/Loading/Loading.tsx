import "./Loading.css";
import { TbLoader2 } from "react-icons/tb";

type LoadingProps = {
  children?: React.ReactNode;
  isFullPage: boolean;
};

const Loading = ({ isFullPage, children }: LoadingProps) => {
  return (
    <div
      className={`loading ${
        isFullPage ? "loading-full-page" : "loading-mini"
      }`}>
      <div className={`${children ? "icon-with-children" : ""}`}>
        <TbLoader2 className="icon" />
        {children}
      </div>
    </div>
  );
};

export default Loading;
