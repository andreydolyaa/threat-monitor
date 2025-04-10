import { type Request, type Response } from "express";
import { Log } from "../models/log-model.ts";
import { create, del, get } from "../modules/actions/db-actions.ts";
import type { TLog } from "../types/index.ts";
import { runGemma2, createLogPrompt } from "../modules/llm/index.ts";

// TODO: pagination
export const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await get(Log);
    res.status(200).json({ data: logs });
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

export const createLog = async (data: TLog) => {
  try {
    // return await create(Log, data);
    const newPrompt = createLogPrompt(data.data.raw);
    const llmResponse = await runGemma2(newPrompt);
    console.log(llmResponse.data);
    // return await create(Log, data);
    
  } catch (error) {
    return {
      message: "failed to upsert log",
      error,
    };
  }
};
