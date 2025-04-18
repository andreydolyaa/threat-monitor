import { useEffect } from "react";
import { useLogsStore } from "../store/logs";
import { Log, LogResponseWrapper } from "../types";

export const useWebSocket = (url: string) => {
  const { addLog } = useLogsStore();

  const dispatchByMessage = (message: LogResponseWrapper) => {
    const list: { [key: string]: (log: Log) => void } = {
      "log-message": addLog,
    };
    list[message.type](message.data);
  };

  useEffect(() => {
    const websocket = new WebSocket(url);
    websocket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      dispatchByMessage(message);
    };

    return () => {
      websocket.close();
    };
  }, []);
};
