import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema(
  {
    identifier: {
      type: String,
      default: "logId",
    },
    seq: {
      type: Number,
      unique:true,
      index:true,
      default: 999,
    },
  },
  {
    versionKey: false,
  }
);

export const Counter = mongoose.model("Counter", CounterSchema);
