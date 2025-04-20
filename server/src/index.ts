import { Database } from "./core/database.ts";
import { Server } from "./core/server.ts";
import { createBasicRules } from "./modules/log-analyzer/analyze.ts";
import router from "./router.ts";

if (!process.env.SERVER_PORT) {
  throw new Error("SERVER_PORT env var is missing");
}

if (!process.env.DB_URL) {
  throw new Error("database is disconnected");
}

export const server = new Server({
  port: parseInt(process.env.SERVER_PORT),
  router,
});



const database = new Database(process.env.DB_URL);

database.connect();

database.on("db_connected", () => {
  server.start();
  createBasicRules();
});

// deleteDocumentsIfExceedsLimit(Log)
