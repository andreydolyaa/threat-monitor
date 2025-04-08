import { Types } from "mongoose";

export type TAgent = {
  _id?: Types.ObjectId;
  type: string;
  agentName: string;
  status: "ONLINE" | "OFFLINE";
  hostIp: string;
  id: string;
};

export type TLog = {
  _id?: Types.ObjectId;
  agentName: string;
  source: string;
  path: string;
  timestamp: Date;
  data: { raw: string };
};

export type TUser = {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
};

export type WebsocketMessage = string | Buffer | Buffer[] | ArrayBuffer;

export type DbActionFilter = Record<string, unknown>;
