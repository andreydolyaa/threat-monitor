import "./Container.css";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  center: boolean;
};

const Container = ({ children, center }: ContainerProps) => {
  return (
    <div className={`container ${center ? "center" : ""}`}>{children}</div>
  );
};

export default Container;
