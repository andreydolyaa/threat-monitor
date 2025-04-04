import { Agent } from "../models/agent-model.ts";
import { type TAgent } from "../types/index.ts";

export const agentUpsert = async (data: TAgent) => {
  try {
    const { agentName, ...rest } = data;
    return await Agent.findOneAndUpdate(
      { agentName },
      { $set: rest },
      { upsert: true, new: true, runValidators: true }
    );
  } catch (error) {
    return {
      message: "failed to upsert agent",
      error,
    };
  }
};
