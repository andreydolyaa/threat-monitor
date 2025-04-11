import { exec } from "child_process";
import { networkInterfaces } from "os";
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

const URL = `${SERVER_PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/ws/agent/${AGENT_NAME}`;
const ws = new WebSocket(URL);

const TYPES = {
  AGENT_INFO: "AGENT_INFO",
  LOG_INFO: "LOG_INFO",
};

const AGENT_STATUS = {
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
};

const SIGNAL = {
  SIGINT: "SIGINT",
  SIGTERM: "SIGTERM",
  UNCAUGHT_EXECEPTION: "uncaughtException",
  UNHANDLED_REJECTION: "unhandledRejection",
  EXIT: "EXIT",
};

function getIp() {
  return Object.values(networkInterfaces())
    .flat()
    .find((net) => net?.family === "IPv4" && !net.internal)?.address;
}

function exitProcess(signal) {
  console.log("received signal: " + signal);
  console.log("shutting down agent...");
  ws.send(JSON.stringify(initAgent(AGENT_STATUS.OFFLINE)));
  process.exit(0);
}

function initAgent(status, info) {
  return {
    type: TYPES.AGENT_INFO,
    agentName: process.env.AGENT_NAME,
    status,
    hostIp: getIp(),
    systemInfo: info
  };
}

function getSystemInfo() {
  const commands = {
    processes: "ps aux --sort=-%mem | head -n 10",
    loggedInUsers: "who",
    systemInfo: "uname -a",
    uptime: "uptime",
    networkInterfaces: "ip -o -4 addr show",
    openPorts: "ss -tuln",
    routes: "ip route show",
  };

  const systemInfo = {};

  return new Promise((resolve) => {
    Promise.all(
      Object.entries(commands).map(([key, cmd]) => {
        return new Promise((res) => {
          exec(cmd, (err, stdout, stderr) => {
            if (err || stderr) {
              systemInfo[key] = `Error: ${err?.message || stderr}`;
            } else {
              systemInfo[key] = stdout.trim();
            }
            res();
          });
        });
      })
    ).then(() => resolve(systemInfo));
  });
}

ws.on("open", () => {
  console.log("agent connected to server:", URL);
  getSystemInfo().then((info) => {
    const agent = JSON.stringify(initAgent(AGENT_STATUS.ONLINE, info));
    ws.send(agent);
  });
});

ws.on("error", (err) => console.error("webSocket error:", err));

process.on(SIGNAL.SIGINT, () => exitProcess(SIGNAL.SIGINT));
process.on(SIGNAL.SIGTERM, () => exitProcess(SIGNAL.SIGTERM));

process.on(SIGNAL.UNCAUGHT_EXECEPTION, (error) => {
  console.error(`${SIGNAL.UNCAUGHT_EXECEPTION}: ${error}`);
  exitProcess(SIGNAL.UNCAUGHT_EXECEPTION);
});

process.on(SIGNAL.UNHANDLED_REJECTION, (resaon) => {
  console.error(`${SIGNAL.UNHANDLED_REJECTION}: ${resaon}`);
  exitProcess(SIGNAL.UNHANDLED_REJECTION);
});

process.on(SIGNAL.EXIT, (code) => {
  console.log("process exiting with code:" + code);
  exitProcess(SIGNAL.EXIT);
});

// watch:

// Auth logs
const authLogFile = "/var/log/auth.log";
const authLogsWatcher = new Watcher(authLogFile, "auth", ws);
authLogsWatcher.watch();

// Syslogs
// const syslogFile = "/var/log/syslog";
// const syslogsWatcher = new Watcher(syslogFile, "syslog", ws);
// syslogsWatcher.watch();
