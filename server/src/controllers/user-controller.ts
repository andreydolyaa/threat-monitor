import type { Request, Response } from "express";
import { User } from "../models/user-model.ts";

export const getUser = async (req: Request, res: Response) => {
  const { email, username } = req.body;
  try {
    const user = await User.findOne({ email, username });
    if (!user) res.status(404).json({ message: "cannot find user" });
    else res.status(200).json({ message: "get user", user });
  } catch (error) {
    res.status(400).json({ message: "cannot get user", error });
  }
};
