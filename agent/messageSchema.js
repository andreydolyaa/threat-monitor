export class MessageSchema {
  constructor() {}

  static create(source, path, log) {
    return {
      type: "LOG_INFO",
      agentName: process.env.AGENT_NAME,
      source,
      path,
      timestamp: new Date().toISOString(),
      data: {
        raw: log,
      },
    };
  }
}
