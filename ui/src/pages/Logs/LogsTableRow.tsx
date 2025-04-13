
import LogsTableItem from "./LogsTableItem";
import { LogsTableProps } from "../../types";


const LogsTableRow = ({ logs }: LogsTableProps) => {
  return (
    <tbody>
      {logs.map((log) => {
        return <LogsTableItem key={log?.logId} log={log} />;
      })}
    </tbody>
  );
};

export default LogsTableRow;
