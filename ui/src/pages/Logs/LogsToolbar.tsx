import React from "react";
import Search from "../../components/Search/Search";
import { SearchProps } from "../../types";

const LogsToolbar = ({ onSearch }: SearchProps) => {
  return (
    <div className="logs-toolbar">
      <Search onSearch={onSearch} />
    </div>
  );
};

export default LogsToolbar;
