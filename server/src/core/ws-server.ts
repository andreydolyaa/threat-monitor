import { type Server } from "http";
import { WebSocket, WebSocketServer } from "ws";
import logger from "./logger.ts";
import type { WebsocketMessage } from "../types/index.ts";
import { dispatchMessageByType } from "../modules/dispatcher/index.ts";

export class WsServer {
  httpServer: Server;
  wsServer: WebSocketServer | null;
  clients: Map<string, WebSocket>;

  constructor(httpServer: Server) {
    this.httpServer = httpServer;
    this.wsServer = null;
    this.clients = new Map<string, WebSocket>();
  }

  start() {
    this.wsServer = new WebSocketServer({ server: this.httpServer });
    this.initListeners();
    logger.info("websocket server started [port: 3005]");
  }

  initListeners() {
    this.wsServer?.on("connection", (websocket, request) => {
      const agentName = request.url?.split("/").pop() || "";
      this.clients.set(agentName, websocket);
      logger.info(`agent connected [${agentName}]`);
      websocket.on("message", this.onMessage);
      websocket.on("close", (code, reason) => {
        this.onClose(code, reason, agentName);
      });
      websocket.on("error", this.onError);
    });
  }

  onMessage(message: WebsocketMessage) {
    dispatchMessageByType(message);
  }

  onError(error: Error) {}

  onClose(code: number, reason: string | Buffer, agentName: string) {
    const msg = `agent disconnected [${agentName}] [code:${code}] [reason:${reason}]`;
    this.clients.delete(agentName);
    logger.warn(msg);
  }

  send(message: string | object, type: string, singleClientName?: string) {
    const data = JSON.stringify({ type, data: message });

    if (singleClientName) {
      const client = this.clients.get(singleClientName);
      this.handleClientSend(client, data);
    } else {
      for (const [agentName, client] of this.clients) {
        this.handleClientSend(client, data);
      }
    }
  }

  handleClientSend(client: WebSocket | undefined, data: string) {
    if (client?.readyState === WebSocket.OPEN) {
      try {
        client?.send(data);
      } catch (error) {
        logger.error("WS | failed to send message");
      }
    }
  }
}
