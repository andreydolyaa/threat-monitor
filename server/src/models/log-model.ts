import mongoose from "mongoose";

const LogsSchema = new mongoose.Schema(
  {
    agentName: {
      required: true,
      type: String,
    },
    source: {
      required: true,
      type: String,
    },
    path: {
      required: true,
      type: String,
    },
    timestamp: Date,
    data: {
      logLine: [String],
    },
  },
  {
    versionKey: false,
  }
);

export const Log = mongoose.model("Log", LogsSchema);
