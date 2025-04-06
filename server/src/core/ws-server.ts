import { type Server } from "http";
import { WebSocketServer } from "ws";
import logger from "./logger.ts";
import type { WebsocketMessage } from "../types/index.ts";
import { dispatchMessageByType } from "../modules/dispatcher/index.ts";

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
      const agentName = request.url?.split("/").pop() || "";
      logger.info(`agent connected [${agentName}]`);
      websocket.on("message", this.onMessage);
      websocket.on("close", (code, reason) =>
        this.onClose(code, reason, agentName)
      );
      websocket.on("error", this.onError);
    });
  }

  onMessage(message: WebsocketMessage) {
    dispatchMessageByType(message);
  }

  onError(error: Error) {}

  onClose(code: number, reason: string | Buffer, agentName: string) {
    const msg = `agent disconnected [${agentName}] [code:${code}] [reason:${reason}]`;
    logger.warn(msg);
  }
}
