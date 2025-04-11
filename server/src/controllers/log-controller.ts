import { type Request, type Response } from "express";
import { Log } from "../models/log-model.ts";
import { create, del, get } from "../modules/actions/db-actions.ts";
import type { Gemma2ProcessedData, HashSchema, TLog } from "../types/index.ts";
import { runGemma2, createLogPrompt, hashLog } from "../modules/llm/index.ts";
import { Hash } from "../models/hash-model.ts";
import { analyzeLog } from '../modules/log-analyzer/analyze.ts';

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

export const createLog = async (log: TLog) => {
  const analyzed = analyzeLog(log.data.raw);
  console.log(analyzed);
  
  // const prompt = createLogPrompt(log.data.raw);
  // const processed = await runGemma2(prompt);
  // if (!processed) {}
  // console.log(processed);
  
  // try {
  //   const hashedLog = hashLog(log.data.raw);
  //   const cachedHash = await Hash.findOne({
  //     hash: hashedLog,
  //   });

  //   if (!cachedHash) {
  //     const prompt = createLogPrompt(log.data.raw);
  //     const processed: Gemma2ProcessedData = await runGemma2(prompt);
  //     if (processed) {
  //       // console.log(processed, "!@!@!");        
  //       await Hash.create({
  //         hash: hashedLog,
  //         raw: log.data.raw,
  //         processed: processed,
  //       });
  //       log.data.processed = { ...processed };
  //     }
  //   } else {
  //     log.data.processed = cachedHash.processed as Gemma2ProcessedData;
  //   }

  //   console.log(log, "@!@!@!@");
    

  //   return await create(Log, log);
  // } catch (error) {
  //   return {
  //     message: "failed to upsert log",
  //     error,
  //   };
  // }
};
