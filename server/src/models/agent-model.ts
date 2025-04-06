import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      index: true,
    },
    agentName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["ONLINE", "OFFLINE"],
    },
    hostIp: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    versionKey: false,
  }
);

export const Agent = mongoose.model("Agent", AgentSchema);
