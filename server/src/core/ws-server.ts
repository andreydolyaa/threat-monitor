import { type Server } from "http";
import { WebSocket, WebSocketServer } from "ws";
import logger from "./logger.ts";
import { websocketMessageType } from "../constants/index.ts";
import { agentUpsert } from "../controllers/agent-controller.ts";

type WebsocketMessage = string | Buffer | Buffer[] | ArrayBuffer;

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
      // const isAgentConnection = request?.url?.includes("agent-report") || false;

      // if (!isAgentConnection) {
      //   const ip = request?.socket?.remoteAddress || "unknown";
      //   logger.warn(`rejected connection to: [${request?.url}] from: [${ip}]`);
      //   websocket.close(1008, "invalid path");
      // } else {
      //   const path = request.url?.split("/") || "unknown";
      //   const agentName = path[path.length - 1];
      //   logger.info(`agent [${agentName}] connected`);

      // }
      websocket.on("message", this.onMessage);
      websocket.on("close", this.onClose);
      websocket.on("error", this.onError);
    });
  }

  onMessage(message: WebsocketMessage) {
    const data = message ? JSON.parse(message as string) : "";

    // create message distributor outside
    if (data.type === websocketMessageType.AGENT_INFO) {
      return agentUpsert(data);
    }
  }

  onError(error: Error) {}

  onClose(code: number, reason: string | Buffer) {
    logger.info("client disconnected");
  }
}
