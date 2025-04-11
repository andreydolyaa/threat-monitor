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
  systemInfo: {
    
  }
};

export type LogAnalysisResult = {
  severity: number;
  suspicious: boolean;
  summary: string;
};

export type TLog = {
  _id?: Types.ObjectId;
  agentName: string;
  source: string;
  path: string;
  timestamp: Date;
  logId?: number;
  data: {
    raw: string;
    processed: LogAnalysisResult;
  };
};

export type TUser = {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
};

export type CounterSchema = {
  identifier: string;
  seq: number;
};

export interface AuthenticatedRequest extends Request {
  user?: TUser;
}

export type WebsocketMessage = string | Buffer | Buffer[] | ArrayBuffer;

export type DbActionFilter = Record<string, unknown>;
