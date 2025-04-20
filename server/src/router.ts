import express from "express";
import logsRouter from "./routes/logs.ts";
import authRouter from "./routes/auth.ts";
import rulesRouter from "./routes/rules.ts";

const router = express.Router();

router.use("/api", authRouter, logsRouter, rulesRouter);

export default router;
