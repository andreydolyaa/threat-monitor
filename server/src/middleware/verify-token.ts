import type { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";

type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const verifyToken: ExpressMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .send({ message: "access denied: no token provided" });
  }

  try {
    const raw = token?.startsWith("Bearer ") ? token.slice(7) : token;
    const decoded = JWT.verify(raw, process.env.JWT_SECRET!);
    // req.user = decoded
    next();
  } catch (error) {
    res.status(401).send({ message: "invalid or expired token" });
  }
};
