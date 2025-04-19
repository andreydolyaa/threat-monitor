import mongoose from "mongoose";

const LogsSchema = new mongoose.Schema(
  {
    agentName: {
      required: true,
      type: String,
      index: true,
    },
    endpointIp: {
      type: String,
      index: true,
    },
    source: {
      required: true,
      type: String,
      index: true,
    },
    path: {
      required: true,
      type: String,
      index: true,
    },
    timestamp: {
      type: Date,
      index: true,
    },
    logId: {
      type: String,
    },
    data: {
      raw: String,
      processed: {
        suspicious: Boolean,
        severity: String,
        summary: String,
      },
    },
  },
  {
    versionKey: false,
  }
);

export const Log = mongoose.model("Log", LogsSchema);
