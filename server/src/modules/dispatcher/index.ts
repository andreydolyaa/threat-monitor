import { agentUpsert } from "../../controllers/agent-controller.ts";
import { createLog } from "../../controllers/log-controller.ts";
import { WEBSOCKET_MESSAGE_TYPE } from "../../constants/index.ts";
import { type WebsocketMessage } from "../../types/index.ts";

export function dispatchMessageByType(incomingMessage: WebsocketMessage) {
  const data = incomingMessage ? JSON.parse(incomingMessage as string) : "";

  if (data.type === WEBSOCKET_MESSAGE_TYPE.AGENT_INFO) return agentUpsert(data);
  if (data.type === WEBSOCKET_MESSAGE_TYPE.LOG_INFO) return createLog(data);
}
