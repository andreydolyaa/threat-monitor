import { Agent } from "../models/agent-model.ts";
import { upsert } from "../modules/actions/db-actions.ts";
import { type TAgent } from "../types/index.ts";

export const agentUpsert = async (data: TAgent) => {
  try {
    return await upsert(Agent, { agentName: data.agentName }, data);
  } catch (error) {
    return {
      message: "failed to upsert agent",
      error,
    };
  }
};
