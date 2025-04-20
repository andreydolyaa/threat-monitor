import mongoose from "mongoose";

const RulesModel = new mongoose.Schema(
  {
    pattern: {
      required: true,
      type: String,
    },
    severity: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    suspicious: {
      type: Boolean,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const Rule = mongoose.model("Rule", RulesModel);
