import fs from "fs";
import readline from "readline";
import { MessageSchema } from "./messageSchema.js";

export class Watcher {
  constructor(filePath) {
    this.filePath = filePath;
    this.readInterval = parseInt(process.env.REPORT_INTERVAL);
  }

  watch() {
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
      const message = MessageSchema.create(clearLine, this.filePath);
      console.log(message);
    });
  }
}
