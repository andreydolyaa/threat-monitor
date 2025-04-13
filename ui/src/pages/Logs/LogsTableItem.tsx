import React from "react";
import { Log } from "../../types";

type LogsTableItemProp = {
  log: Log
}

const LogsTableItem = ({ log }: LogsTableItemProp) => {
  return (
    <tr>
      <td>{log.logId}</td>
      <td>{log.data.processed.summary}</td>
      <td>{log.data.processed.severity}</td>
      <td>{log.source}</td>
      <td>{log.timestamp}</td>
      <td>{log.agentName}</td>
      <td>{log.endpointIp}</td>
    </tr>
  );
};

export default LogsTableItem;
