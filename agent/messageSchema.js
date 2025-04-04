export class MessageSchema {
  constructor() {}

  static create(log, path) {
    return {
      agentName: process.env.AGENT_NAME,
      reportPath: process.env.REPORT_PATH,
      serverIp: process.env.SERVER_IP,
      serverPort: process.env.SERVER_PORT,
      watchPath: path,
      time: "",
      data: {
        log,
      },
    };
  }
}
