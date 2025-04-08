import express from "express";
import logsRouter from "./routes/logs.ts";
import authRouter from "./routes/auth.ts";

const router = express.Router();

router.use("/api", authRouter, logsRouter);

export default router;
