import React, { useEffect } from "react";
import { useLogsStore } from "../../store/logs";

const Logs = () => {
  const { getLogs } = useLogsStore();

  useEffect(() => {
    getLogs();
  },[])
  return <div>Logs</div>;
};

export default Logs;
