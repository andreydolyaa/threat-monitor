import { LogsTableProps } from "../../types";
import LogsItem from "./LogsItem";
import LogsTableHeader from "./LogsTableHeader";

const LogsTable = ({ logs }: LogsTableProps) => {
  return (
    <div className="logs-table">
      <LogsTableHeader />
      {logs.map((log) => {
        return <LogsItem key={log.logId} log={log} />;
      })}
    </div>
  );
};

export default LogsTable;
