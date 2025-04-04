import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    agentName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["online", "offline"],
    },
    hostIp: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const Agent = mongoose.model("Agent", AgentSchema);
