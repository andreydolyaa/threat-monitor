export class MessageSchema {
  constructor() {}

  static create(source, path, log) {
    return {
      agentName: process.env.AGENT_NAME,
      source,
      path,
      timestamp: new Date().toISOString(),
      data: {
        logLine: log,
      },
    };
  }
}
