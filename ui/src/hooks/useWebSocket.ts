import { useEffect } from "react";

export const useWebSocket = (url: string) => {
  useEffect(() => {
    const websocket = new WebSocket(url);
    websocket.onmessage = (e) => {
      console.log(JSON.parse(e.data), "INCOMING WEBSOCKET MESSAGE");
    };

    return () => {
      websocket.close();
    };
  }, []);
};
