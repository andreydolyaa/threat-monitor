import { type ObjectId } from "mongoose";

export type TAgent = {
  _id?: ObjectId;
  type: string;
  agentName: string;
  status: "ONLINE" | "OFFLINE";
  hostIp: string;
  id: string;
};

export type WebsocketMessage = string | Buffer | Buffer[] | ArrayBuffer;

export type DbActionFilter = Record<string, unknown>;
