import React from "react";
import "./Toolbar.css";

type ToolbarProps = {
  children: React.ReactNode;
};

const Toolbar = ({ children }: ToolbarProps) => {
  return <div className="toolbar">{children}</div>;
};

export default Toolbar;
