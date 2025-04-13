import fs from "fs";
import { spawn } from "child_process";
import readline from "readline";
import { MessageSchema } from "./messageSchema.js";

export class Watcher {
  constructor(filePath, source, ws, deviceIp) {
    this.filePath = filePath;
    this.source = source;
    this.deviceIp = deviceIp;
    this.ws = ws;
    this.readInterval = parseInt(process.env.REPORT_INTERVAL);
  }

  watchFullLog() {
    fs.watchFile(this.filePath, { interval: this.readInterval }, () => {
      const stream = this.createStream();
      this.readFile(stream);
    });
  }

  createStream() {
    return fs.createReadStream(this.filePath, {
      encoding: "utf8",
      flags: "r",
    });
  }

  readFile(stream) {
    const rl = readline.createInterface({ input: stream });
    rl.on("line", (line) => {
      const clearLine = line.replace(/\s+/g, " ");
      const message = MessageSchema.create(
        this.source,
        this.filePath,
        clearLine
      );
      this.send(message);
    });
  }

  watch() {
    const tail = spawn("tail", ["-n", 0, "-F", this.filePath]);

    tail.stdout.on("data", (data) => {
      const lines = data.toString().trim().split("\n");
      lines.forEach((line) => {
        if (
          line.includes("sudo: pam_unix(sudo:session): session opened") ||
          line.includes("sudo: pam_unix(sudo:session): session closed")
        ) {
          return;
        }
        const message = MessageSchema.create(this.source, this.filePath, line, this.deviceIp);
        this.send(message);
      });
    });

    tail.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
    });

    tail.on("close", (code) => {
      console.log(`tail process exited with code ${code}`);
    });
  }

  send(data) {
    this.ws.send(JSON.stringify(data));
  }
}
