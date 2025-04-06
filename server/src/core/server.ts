import http, { type Server as HttpServer } from "http";
import express, { type Express, type Router } from "express";
import cors from "cors";
import logger from "./logger.ts";
import { WsServer } from "./ws-server.ts";

interface ServerOptions {
  port: number;
  router: Router;
}

export class Server {
  app: Express;
  port: number;
  router: Router;
  server: HttpServer;

  constructor(options: ServerOptions) {
    this.app = express();
    this.port = options.port;
    this.router = options.router;
    this.server = http.createServer(this.app);
    this.init();
  }

  init() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(this.router);
    
  }

  start() {
    this.server.listen(this.port, () => {
      logger.info(`server started [port: ${this.port}]`);
      this.startWsServer();
    });
  }

  startWsServer() {
    const wsServer = new WsServer(this.server);
    wsServer.start();
  }

}
