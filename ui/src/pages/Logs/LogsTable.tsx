import React, { useState } from "react";
import { LogsTableProps } from "../../types";
import { LogDetails } from "./LogDetails";
import LogsItem from "./LogsItem";
import LogsTableHeader from "./LogsTableHeader";
import Loading from "../../components/Loading/Loading";
import Empty from "../../components/Empty/Empty";

const LogsTable = ({ logs, loading, error }: LogsTableProps) => {
  const [expendedId, setExpendedId] = useState<number | null>(null);

  const handleLogExpend = (logId: number) => {
    setExpendedId((prev) => (prev === logId ? null : logId));
  };

  if (loading && !logs.length) {
    return <Loading isFullPage={true} />;
  }

  if (error || !logs.length) {
    return <Empty message={error ? error : "no log data found"} />;
  }

  return (
    <div className="logs-table">
      <LogsTableHeader />
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
