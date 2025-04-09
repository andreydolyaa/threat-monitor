import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { type Request, type Response } from "express";
import { User } from "../models/user-model.ts";
import { create, upsert } from "../modules/actions/db-actions.ts";
import type { AuthenticatedRequest, TUser } from "../types/index.ts";

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
      const { password, ...userWithoutPassword } = loggedUser ?? {};
      const token = JWT.sign(
        { user: userWithoutPassword },
        process.env.JWT_SECRET!,
        {
          expiresIn: "30d",
        }
      );
      res.status(200).json({
        message: "login successful",
        user: userWithoutPassword,
        token,
      });
    } else {
      res.status(400).json({ message: "wrong user credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: "server error", error });
  }
};

export const logout = async (req: AuthenticatedRequest, res: Response) => {
  const { username, email } = req.user!;

  try {
    const user = await User.findOneAndUpdate(
      { email, username },
      { isLoggedIn: false },
      { new: true }
    ).lean();

    if (!user) res.status(400).json({ message: "user not found" });
    else {
      delete req.user 
      res.status(200).json({ message: "user logged out" });
    }
  } catch (error) {
    res.status(400).json({ message: "logout failed", error });
  }
};

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body as TUser;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await create(User, { username, email, password: hashed });
    res.status(200).json({ message: "user created" });
  } catch (error) {
    res.status(400).send({ message: "failed to create user", error });
  }
};
