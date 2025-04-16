import { type Request, type Response } from "express";
import { Log } from "../models/log-model.ts";
import { create, del, get } from "../modules/actions/db-actions.ts";
import type { CounterSchema, TLog } from "../types/index.ts";
import { analyzeLog } from "../modules/log-analyzer/analyze.ts";
import logger from "../core/logger.ts";
import { Counter } from "../models/counter-model.ts";
import { responseWrapper, sleep } from "../utils/index.ts";
import { notify } from "../modules/actions/ws-actions.ts";

// TODO: pagination
export const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await get(Log, req);
    // await sleep(3000)
    res.status(200).json({ data: logs, type: "logs" });
  } catch (error) {
    res.status(400).send({ message: "failed to get logs", error });
  }
};

export const deleteLog = async (req: Request, res: Response) => {
  try {
    const document = await del(Log, req);
    res.status(200).json({ message: "log deleted", id: document?._id });
  } catch (error) {
    res.status(400).send({ message: "failed to delete log", error });
  }
};

export const createLog = async (log: TLog) => {
  const analyzed = analyzeLog(log.data.raw);
  try {
    const identifier = { identifier: "logId" };
    const isCounterExist = await Counter.countDocuments();

    if (!isCounterExist) {
      await Counter.create({ seq: 999 });
    }

    const logIdCounter: CounterSchema = await Counter.findOneAndUpdate(
      identifier,
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    ).lean();

    log.logId = logIdCounter.seq;
    log.data.processed = analyzed;

    logger.info(`LOG | log analysis done [LOG_ID: ${logIdCounter.seq}]`);
    
    notify("log-message", log);
    return await Log.create(log);
  } catch (error) {
    logger.error(`LOG | failed to create log: ${error}`);
    return {
      message: "failed to upsert log",
      error,
    };
  }
};
