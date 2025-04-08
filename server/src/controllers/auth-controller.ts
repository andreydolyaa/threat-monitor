import bcrypt from "bcrypt";
import { type Request, type Response } from "express";
import { User } from "../models/user-model.ts";
import { create, upsert } from "../modules/actions/db-actions.ts";
import type { TUser } from "../types/index.ts";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "wrong user credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const loggedUser = await upsert(User, { email }, { isLoggedIn: true });
      res.status(200).json({ message: "login successful", loggedUser });
    } else {
      res.status(400).json({ message: "wrong user credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: "server error", error });
  }
};

// TODO: logout by jwt
export const logout = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  try {
    await User.findOneAndUpdate({ username, email }, { isLoggedIn: false });
    res.status(200).json({ message: "user logged out" });
  } catch (error) {
    res.status(400).json({ message: "logout failed", error });
  }
};

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body as TUser;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await create(User, { username, email, password: hashed });
    res.status(200).json({ message: "user created", user });
  } catch (error) {
    res.status(400).send({ message: "failed to create user", error });
  }
};
