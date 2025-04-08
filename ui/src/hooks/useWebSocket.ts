import { useEffect, useRef, useState } from "react";

export const useWebSocket = (url: string) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => setIsOpen(true);
    socket.onclose = () => setIsOpen(false);

    socket.onmessage = (e) => {
      console.log(e.data, "socket message $");
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return { isOpen };
};
