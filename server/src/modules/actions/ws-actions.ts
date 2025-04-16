import logger from "../../core/logger.ts";
import { server } from "../../index.ts";

export const notify = (type: string, message: string | object) => {
  server.wsServer?.send(message, type);
};
