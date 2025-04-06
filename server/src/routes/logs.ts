import express from "express";
import { deleteLog, getLogs } from "../controllers/log-controller.ts";

const router = express.Router();

router.get("/logs", getLogs);
router.delete("/logs/:id", deleteLog);

export default router;
