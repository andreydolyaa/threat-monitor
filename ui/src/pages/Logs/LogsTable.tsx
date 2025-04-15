import React, { useState } from "react";
import { LogsTableProps } from "../../types";
import { LogDetails } from "./LogDetails";
import LogsItem from "./LogsItem";

const LogsTable = ({ logs }: LogsTableProps) => {
  const [expendedId, setExpendedId] = useState<number | null>(null);

  const handleLogExpend = (logId: number) => {
    setExpendedId((prev) => (prev === logId ? null : logId));
  };

  return (
    <div className="logs-table">
      {logs.map((log) => {
        return (
          <React.Fragment key={log.logId}>
            <LogsItem log={log} onClick={() => handleLogExpend(log.logId)} />
            <div className={`fade ${expendedId === log.logId ? "in" : ""}`}>
              {expendedId === log.logId && <LogDetails log={log} />}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default LogsTable;
