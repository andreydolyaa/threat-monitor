import React from "react";
import { useLogsStore } from "../../store/logs";
import Loading from "../../components/Loading/Loading";
import LogsTableItem from "./LogsTableItem";


const LogsTableRow = () => {
  const { logs, loading } = useLogsStore();

  const fetching = () => {
    return <Loading isFullPage={true} />;
  };

  // TODO: handle
  const empty = () => {
    return <div>EMPTY (NO SEARCH RESULTS OR NO DATA FETCHED)</div>;
  };

  if (loading) return fetching();
  if (!loading && !logs.length) return empty();

  return (
    <tbody>
      {logs.map((log) => {
        return <LogsTableItem key={log?.logId} log={log} />;
      })}
    </tbody>
  );
};

export default LogsTableRow;
