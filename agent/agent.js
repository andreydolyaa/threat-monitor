import fs from "fs";
import readline from "readline";
import WebSocket from "ws";

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

