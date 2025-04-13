import type { Request } from "express";
import { type Model, type Document, type RootFilterQuery } from "mongoose";
import logger from "../../core/logger.ts";
import type { DbActionFilter } from "../../types/index.ts";
import { strObj } from "../../utils/index.ts";

// TODO: pagination
export async function get<T>(model: Model<T>, req: Request) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const searchQuery: RootFilterQuery<T> = { $or: [] };

  if (req.query.search) {
    const searchRegex = { $regex: req.query.search, $options: "i" };
    searchQuery.$or = [{ logId: searchRegex }];
  }

  try {
    const data = await model
      .find({ ...searchQuery })
      .skip(skip)
      .limit(limit);

    if (!data) throw new Error();

    const totalLogs = await model.countDocuments({ ...searchQuery });
    const totalPages = Math.ceil(totalLogs / limit);
    const responseData = {
      data,
      totalPages,
      currentPage: page,
    };

    logger.info(`DB | GET req [${strObj(data)}]`);
    return responseData;
  } catch (error) {
    logger.error(`DB | error during GET req`);
    throw error;
  }
}

export async function del<T>(model: Model<T>, req: Request) {
  try {
    const data = await model.findOneAndDelete({ _id: req.params.id });
    logger.info(`DB | DEL req [${strObj(data)}]`);
    return data;
  } catch (error) {
    logger.error(`DB | error during DEL req ${error}`);
    throw error;
  }
}

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
    throw error;
  }
}

export async function create<T>(model: Model<T>, data: Partial<T>) {
  try {
    const document = await model.create({ ...data });
    logger.info(`DB | document created [${strObj(data)}]`);
    return document;
  } catch (error) {
    logger.error(`DB | document creation failed[${strObj(error)}]`);
    throw error;
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
