import { type Server } from "http";
import { WebSocket, WebSocketServer } from "ws";
import logger from "./logger.ts";

export class WsServer {
  httpServer: Server;
  wsServer: WebSocketServer | null;

  constructor(httpServer: Server) {
    this.httpServer = httpServer;
    this.wsServer = null;
  }

  start() {
    this.wsServer = new WebSocketServer({ server: this.httpServer });
    this.initListeners();
    logger.info("websocket server started [port: 3005]");
  }

  initListeners() {
    this.wsServer?.on("connection", (websocket, request) => {
      logger.info("client connected");
      websocket.on("message", this.onMessage);
      websocket.on("close", this.onClose);
      websocket.on("error", this.onError);
    });
  }

  onMessage(message: string | Buffer | Buffer[] | ArrayBuffer) {}

  onError(error: Error) {}

  onClose(code: number, reason: string | Buffer) {
    logger.info("client disconnected");
  }
}
