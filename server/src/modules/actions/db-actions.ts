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
