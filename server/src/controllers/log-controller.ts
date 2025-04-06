import { Log } from "../models/log-model.ts";
import { create } from "../modules/actions/db-actions.ts";
import type { TLog } from "../types/index.ts";

export const createLog = async (data: TLog) => {
  try {
    return await create(Log, data);
  } catch (error) {
    return {
      message: "failed to upsert log",
      error,
    };
  }
};
