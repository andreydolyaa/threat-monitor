import express from "express";
import { login, logout, register } from "../controllers/auth-controller.ts";
import { verifyToken } from "../middleware/verify-token.ts";
import { getUser } from "../controllers/user-controller.ts";

const router = express.Router();

router.get("/auth/user", verifyToken, getUser);
router.post("/auth/login", login);
router.post("/auth/logout", verifyToken, logout);
router.post("/auth/register", register);

export default router;
