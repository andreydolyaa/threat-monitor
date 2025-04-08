import type { Request, Response } from "express";
import { User } from "../models/user-model.ts";
import type { AuthenticatedRequest } from "../types/index.ts";

export const getUser = async (req: AuthenticatedRequest, res: Response) => {
  const { email, username } = req.user!;

  try {
    const user = await User.findOne({ email, username }).lean();
    if (!user) res.status(404).json({ message: "cannot find user" });
    else {
      const { password, ...userWithoutPassword } = user ?? {};
      res.status(200).json({ message: "get user", user: userWithoutPassword });
    }
  } catch (error) {
    res.status(400).json({ message: "cannot get user", error });
  }
};
