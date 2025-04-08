import JWT, { type JwtPayload } from "jsonwebtoken";
import type { NextFunction, Response, Request } from "express";
import type { AuthenticatedRequest, TUser } from "../types";

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(403).send({ message: "access denied: no token provided" });
    return;
  }

  try {
    const raw = token?.startsWith("Bearer ") ? token.slice(7) : token;
    const decoded = JWT.verify(raw, process.env.JWT_SECRET!) as Record<string, TUser>;
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).send({ message: "invalid or expired token" });
  }
};
