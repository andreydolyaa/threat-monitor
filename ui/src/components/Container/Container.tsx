import "./Container.css";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  center?: boolean;
  column?: boolean;
};

const Container = ({
  children,
  center = false,
  column = false,
}: ContainerProps) => {
  return (
    <div
      className={`container ${center ? "center" : ""} ${
        column ? "column" : ""
      }`}>
      {children}
    </div>
  );
};

export default Container;
