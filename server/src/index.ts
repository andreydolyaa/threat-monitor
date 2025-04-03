import { Server } from "./core/server.ts";
import router from "./routes/index.ts";

if (!process.env.SERVER_PORT) {
  throw new Error("SERVER_PORT env var is missing");
}

const server = new Server({
  port: parseInt(process.env.SERVER_PORT),
  router,
});

server.start();