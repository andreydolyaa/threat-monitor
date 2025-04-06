import express from "express";
import logsRouter from "./routes/logs.ts";

const router = express.Router();


router.use("/api", logsRouter);

export default router;