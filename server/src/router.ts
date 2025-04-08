import express from "express";
import logsRouter from "./routes/logs.ts";
import usersRouter from "./routes/auth.ts";

const router = express.Router();

router.use("/api", logsRouter, usersRouter);

export default router;
