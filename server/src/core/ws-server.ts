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
      const isAgentConnection = request?.url?.includes("agent-report") || false;

      if (!isAgentConnection) {
        const ip = request?.socket?.remoteAddress || "unknown";
        logger.warn(`rejected connection to: [${request?.url}] from: [${ip}]`);
        websocket.close(1008, "invalid path");
      } else {
        const path = request.url?.split("/") || "unknown";
        const agentName = path[path.length - 1];
        logger.info(`agent [${agentName}] connected`);

        websocket.on("message", this.onMessage);
        websocket.on("close", this.onClose);
        websocket.on("error", this.onError);
      }
    });
  }

  onMessage(message: string | Buffer | Buffer[] | ArrayBuffer) {
    logger.warn(message ? JSON.parse(message) : "");
  }

  onError(error: Error) {}

  onClose(code: number, reason: string | Buffer) {
    logger.info("client disconnected");
  }
}
