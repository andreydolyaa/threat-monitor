import fs, { read } from "fs";
import { networkInterfaces } from 'os';
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


const ip = Object.values(networkInterfaces())
  .flat()
  .find((net) => net?.family === 'IPv4' && !net.internal)?.address;

ws.on("open", () => {
  console.log("agent connected to server:", URL);
  const agentInfo = {
    type: "agent_info",
    agentName: AGENT_NAME,
    status: "online",
    hostIp: ip,
  };
  ws.send(JSON.stringify(agentInfo));
});

// ws.on("close", () => {
//   console.log("agent disconnected from server:", URL);
//   const agentInfo = {
//     type: "agent_info",
//     agentName: AGENT_NAME,
//     status: "offline",
//     hostIp: ip,
//   };
//   ws.send(JSON.stringify(agentInfo));
// });

ws.on("error", (err) => console.error("webSocket error:", err));

// Auth logs
const authLogFile = "/var/log/auth.log";
const authLogsWatcher = new Watcher(authLogFile, "auth", ws);
authLogsWatcher.watch(); 
// Syslogs             
// const syslogFile = "/var/log/syslog"; 
// const syslogsWatcher = new Watcher(syslogFile, "syslog", ws);
// syslogsWatcher.watch();
