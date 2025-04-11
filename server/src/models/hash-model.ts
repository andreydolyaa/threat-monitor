import mongoose from "mongoose";

const HashSchema = new mongoose.Schema(
  {
    hash: {
      type: String,
      required: true,
      index: true,
    },
    raw: {
      type: String,
      required: true,
      index: true,
    },
    processed: {
      isSuspicious: Boolean,
      severityScore: Number,
      summary: String,
    },
  },
  {
    versionKey: false,
  }
);

export const Hash = mongoose.model("Hash", HashSchema);
