import mongoose from "mongoose";
import logger from "./logger.ts";
import { sleep } from "../utils/index.ts";
import { EventEmitter } from "events";

export class Database extends EventEmitter {
  url: string;

  RECONNECT_INTERVAL = 1000;
  CONNECTION_TIMEOUT = 4000;

  constructor(url: string) {
    super();
    this.url = url;
    this.setupListeners();
  }

  async connect(): Promise<void> {
    logger.warn("DB | trying to connect...");
    try {
      await mongoose.connect(this.url, {
        serverSelectionTimeoutMS: this.CONNECTION_TIMEOUT,
      });
      this.emit("db_connected");
    } catch (error) {}
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
    } catch (error) {
      logger.error(`DB | error disconnecting [error ${error}]`);
    }
  }

  async reconnect(): Promise<void> {
    await sleep(this.RECONNECT_INTERVAL);
    await this.connect();
  }

  setupListeners(): void {
    mongoose.connection.on("connected", () => {
      logger.info("DB | connection established");
    });
    mongoose.connection.on("disconnected", () => {
      logger.warn("DB | disconnected");
      this.emit("db_disconnected");
      this.reconnect();
    });
    mongoose.connection.on("close", () => {
      logger.info("DB | connection closed");
    });
    mongoose.connection.on("error", (error) => {
      logger.error(`DB | connection error [error: ${error}]`);
    });
  }
}
