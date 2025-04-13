import LogsTableThead from "./LogsTableThead";
import LogsTableRow from "./LogsTableRow";
import { LogsTableProps } from "../../types";

const LogsTable = ({ logs }: LogsTableProps) => {
  return (
    <table>
      <LogsTableThead />
      <LogsTableRow logs={logs} />
    </table>
  );
};

export default LogsTable;
