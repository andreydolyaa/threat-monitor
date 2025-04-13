export class MessageSchema {
  constructor() {}

  static create(source, path, log, endpointIp) {
    return {
      type: "LOG_INFO",
      agentName: process.env.AGENT_NAME,
      endpointIp,
      source,
      path,
      timestamp: new Date().toISOString(),
      data: {
        raw: log,
      },
    };
  }
}
