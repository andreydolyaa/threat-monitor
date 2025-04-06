import { type Model, type Document } from "mongoose";
import logger from "../../core/logger.ts";
import type { DbActionFilter } from "../../types/index.ts";
import { strObj } from "../../utils/index.ts";

export async function upsert<T>(
  model: Model<T>,
  filter: DbActionFilter,
  data: Partial<T>
) {
  try {
    const document = await model
      .findOneAndUpdate(filter, { $set: data }, { upsert: true, new: true })
      .lean<T>();
    logger.info(`DB | document upsert [${strObj(filter)}]`);
    return document;
  } catch (error) {
    logger.error(
      `DB | document upsert failed [${strObj(filter)}] [${strObj(error)}]`
    );
  }
}

export async function create<T>(model: Model<T>, data: Partial<T>) {
  try {
    const document = await model.create({ ...data });
    logger.info(`DB | document created [${strObj(data)}]`);
    return document;
  } catch (error) {
    logger.error(`DB | document creation failed[${strObj(error)}]`);
  }
}

export async function deleteDocumentsIfExceedsLimit<T>(model: Model<T>) {
  const maxLogs = parseInt(process.env.LOGS_MAX_COUNT || "50000");
  const keepCount = parseInt(process.env.LOGS_KEEP_COUNT || "40000");
  const docCount = await model.countDocuments();

  if (docCount > maxLogs) {
    const deleteCount = docCount - keepCount; // keep <keepCount> docs, delete the rest
    const docsToDelete = await model.find().sort({ _id: 1 }).limit(deleteCount);
    await model.deleteMany({
      _id: { $in: docsToDelete.map((doc) => doc._id) },
    });
    logger.warn(`${deleteCount} documents deleted`);
  } else {
    logger.info("document count is under the limit, no deletion performed.");
  }
}
