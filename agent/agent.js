import fs, { read } from "fs";
import readline from "readline";
import WebSocket from "ws";
import { Watcher } from "./watcher.js";

const { AGENT_NAME, SERVER_PORT, SERVER_IP, SERVER_PROTOCOL, REPORT_PATH } =
  process.env;

if (
  !AGENT_NAME ||
  !SERVER_PORT ||
  !SERVER_IP ||
  !SERVER_PROTOCOL ||
  !REPORT_PATH
) {
  throw new Error("cannot start: missing environment variables");
}

const URL = `${SERVER_PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/${REPORT_PATH}/${AGENT_NAME}`;
const ws = new WebSocket(URL);

ws.on("open", () => {
  console.log("agent connected to server:", URL);
});

ws.on("error", (err) => console.error("webSocket error:", err));

// Auth logs
const authLogFile = "/var/log/auth.log";
const authLogsWatcher = new Watcher(authLogFile, "auth", ws);
authLogsWatcher.watch();

// Syslogs
const syslogFile = "/var/log/syslog";
const syslogsWatcher = new Watcher(syslogFile, "syslog", ws);
syslogsWatcher.watch();
