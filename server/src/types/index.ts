import { type Request } from "express";
import { type JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export type TAgent = {
  _id?: Types.ObjectId;
  type: string;
  agentName: string;
  status: "ONLINE" | "OFFLINE";
  hostIp: string;
  id: string;
};

export type Gemma2ProcessedData = {
  isSuspicious: boolean;
  severityScore: number;
  summary: string;
};

export type TLog = {
  _id?: Types.ObjectId;
  agentName: string;
  source: string;
  path: string;
  timestamp: Date;
  data: {
    raw: string;
    processed: Gemma2ProcessedData;
  };
};

export type HashSchema = {
  hash: string;
  raw: string;
  processed: Gemma2ProcessedData;
};

export type TUser = {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
};

export interface AuthenticatedRequest extends Request {
  user?: TUser;
}

export type WebsocketMessage = string | Buffer | Buffer[] | ArrayBuffer;

export type DbActionFilter = Record<string, unknown>;
